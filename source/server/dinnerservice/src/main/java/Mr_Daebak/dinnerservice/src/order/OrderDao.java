package Mr_Daebak.dinnerservice.src.order;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.order.model.*;
import Mr_Daebak.dinnerservice.src.user.model.GetUserRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.DATABASE_ERROR;

@Repository
public class OrderDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Transactional
    public int createOrder(PostOrderReq postOrderReq) throws BaseException {
        try {
            System.out.println("dao 시작");
            /** cardNum 이 널인 경우 막아줘야함!! */
            String getAndModifyOrderQuery = "select address from user where userIdx = ?";
            String userIdx = String.valueOf(postOrderReq.getUserIdx());
            System.out.println("getUserAddressRes 시작");
            String address = this.jdbcTemplate.queryForObject(getAndModifyOrderQuery, String.class, userIdx);
            System.out.println("address :" + address);
            System.out.println("getUserAddressRes 끝");

            System.out.println("create Order 시작");
            String createOrderQuery = "insert into `order`(userIdx, deliveredAt, address, cardNum) values (?,?,?,?)";
            Object[] createOrderParams = new Object[]{postOrderReq.getUserIdx(), postOrderReq.getDeliveredAt(), address, postOrderReq.getCardNum()};
            this.jdbcTemplate.update(createOrderQuery, createOrderParams);
            System.out.println("create Order 끝");

            System.out.println("select last_id 시작");
            String lastInsertIdQuery = "select last_insert_id()";
            int orderIdx = this.jdbcTemplate.queryForObject(lastInsertIdQuery, int.class);
            System.out.println("select last_id 끝");

            createDinnerExtra(postOrderReq, orderIdx);
            return orderIdx;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    @Transactional
    public void createDinnerExtra(PostOrderReq postOrderReq, int orderIdx) throws BaseException {
        try {
            int dinnerPrice = 0;
            int totalPrice = 0;
            System.out.println("createDinnerExtra 시작");
            List<GetDinner> dinnerList = postOrderReq.getDinnerList();
            System.out.println("dinnerList.size() : " + dinnerList.size());
            for (int i=0; i<=(dinnerList.size()-1); i++) {
                System.out.println("i : " + i);
                dinnerPrice = 0;
                String createDinnerQuery = "insert into dinnerList (orderIdx, dinnerNo, style, amount) values (?,?,?,?)";
                Object[] createDinnerParams = new Object[]{orderIdx, dinnerList.get(i).getDinnerNo(), dinnerList.get(i).getStyle(), dinnerList.get(i).getAmount()};
                System.out.println("createDinner 시작");
                this.jdbcTemplate.update(createDinnerQuery, createDinnerParams);
                System.out.println("createDinner 끝");

                String lastInsertIdQuery = "select last_insert_id()";
                int dinnerIdx = this.jdbcTemplate.queryForObject(lastInsertIdQuery, int.class);

                List<GetExtra> extraList = dinnerList.get(i).getExtraList();
                System.out.println("extraList.size() : " + extraList.size());
                for (int j=0; j<=(extraList.size()-1); j++) {
                    System.out.println("j : " + j);
                    System.out.println("getExtraPriceExtra 시작");
                    String getExtraPriceQuery = "SELECT price FROM extra WHERE extraNo = ?";
                    String getExtraPriceParams = String.valueOf(extraList.get(j).getExtraNo());
                    dinnerPrice += extraList.get(j).getAmount() * this.jdbcTemplate.queryForObject(getExtraPriceQuery, int.class, getExtraPriceParams);
                    System.out.println("getExtraPriceExtra 시작");
                    System.out.println("createExtra 시작");
                    String createExtraQuery = "insert into extraList (dinnerIdx, extraNo, amount) values (?,?,?)";
                    Object[] createExtraParams = new Object[]{dinnerIdx, extraList.get(j).getExtraNo(), extraList.get(j).getAmount()};
                    this.jdbcTemplate.update(createExtraQuery, createExtraParams);
                    System.out.println("createExtra 끝");
                    String lastInsertIdQuery2 = "select last_insert_id()";
                    int extraIdx = this.jdbcTemplate.queryForObject(lastInsertIdQuery2, int.class);
                }
                totalPrice += dinnerPrice;
                System.out.println("changeDinnerPrice 시작");
                System.out.println("dinnerPrice : " + dinnerPrice);
                String changeDinnerPriceQuery = "update dinnerList set dinnerPrice = ? where dinnerIdx = ?";
                Object[] changeDinnerPriceParams = new Object[]{dinnerPrice, dinnerIdx};
                this.jdbcTemplate.update(changeDinnerPriceQuery, changeDinnerPriceParams);
                System.out.println("changeDinnerPrice 끝");
            }
            System.out.println("changeOrderPrice 시작");
            String changeOrderPriceQuery = "update `order` set totalPrice = ? where orderIdx = ?";
            Object[] changeOrderPriceParams = new Object[]{totalPrice, orderIdx};
            this.jdbcTemplate.update(changeOrderPriceQuery, changeOrderPriceParams);
            System.out.println("changeOrderPrice 끝");
            System.out.println("createDinnerExtra 끝");
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

//    public GetOrderRes getOrder(Integer userIdx) {
//        String getOrderQuery = "select userIdx, name, id, password, email, phoneNum, address, totalPrice from user where userIdx = ?"; // 해당 email을 만족하는 User의 정보들을 조회한다.
//        String getOrderParams = String.valueOf(userIdx);
//
//        return this.jdbcTemplate.queryForObject(getOrderQuery,
//                (rs, rowNum) -> new GetUserRes(
//                        rs.getInt("userIdx"),
//                        rs.getString("name"),
//                        rs.getString("id"),
//                        rs.getString("password"),
//                        rs.getString("email"),
//                        rs.getString("phoneNum"),
//                        rs.getString("address"),
//                        rs.getInt("totalPrice")
//                ), // RowMapper(위의 링크 참조): 원하는 결과값 형태로 받기
//                getOrderParams
//        );
//    }

    public int changeStateDelete(int orderIdx) {
        String changeStateDeleteQuery = "update `order` set state = 0 where orderIdx = ?";
        String changeStateDeleteParams = String.valueOf(orderIdx);
        return this.jdbcTemplate.update(changeStateDeleteQuery, changeStateDeleteParams);
    }

    public int changeStateStart(int orderIdx) {
        String changeStateStartQuery = "update `order` set state = 2 where orderIdx = ?";
        String changeStateStartParams = String.valueOf(orderIdx);
        return this.jdbcTemplate.update(changeStateStartQuery, changeStateStartParams);
    }

    public int changeStateComplete(int orderIdx) {
        String changeStateCompleteQuery = "update `order` set state = 3 where orderIdx = ?";
        String changeStateCompleteParams = String.valueOf(orderIdx);
        return this.jdbcTemplate.update(changeStateCompleteQuery, changeStateCompleteParams);
    }

    public int changeStateDeliver(int orderIdx) {
        String changeStateDeliverQuery = "update `order` set state = 4 where orderIdx = ?";
        String changeStateDeliverParams = String.valueOf(orderIdx);
        return this.jdbcTemplate.update(changeStateDeliverQuery, changeStateDeliverParams);
    }

}