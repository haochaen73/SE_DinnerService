package Mr_Daebak.dinnerservice.src.order;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.order.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.DATABASE_ERROR;
import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.REQUEST_ERROR;

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
            String createOrderQuery = "insert into `order`(userIdx, deliveredAt, address, cardNum, totalPrice) values (?,?,?,?,?)";
            Object[] createOrderParams = new Object[]{postOrderReq.getUserIdx(), postOrderReq.getDeliveredAt(), address, postOrderReq.getCardNum(), postOrderReq.getTotalPrice()};
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

//    public int HowMuchStylePrice(String style) {
//        int result = 0;
//        if (style.equals("Simple")) { result = 0; }
//        else if (style.equals("Grand")) { result = 1000; }
//        else if (style.equals("Deluxe")) { result = 2000; }
//        else { result =  -1; }
//        return result;
//    }

    @Transactional
    public void createDinnerExtra(PostOrderReq postOrderReq, int orderIdx) throws BaseException {
        try {
//            int dinnerPrice = 0;
//            int totalPrice = 0;
            List<PostOrderGetDinner> dinnerList = postOrderReq.getDinnerList();
            for (int i=0; i<=(dinnerList.size()-1); i++) {
//                dinnerPrice = 0;
//                int stylePrice = HowMuchStylePrice(dinnerList.get(i).getStyle());
//                if (stylePrice == -1) {
//                    throw new BaseException(REQUEST_ERROR);
//                } else {
//                    dinnerPrice += stylePrice; }
                String createDinnerQuery = "insert into dinnerList (orderIdx, dinnerName, style, amount, dinnerPrice) values (?,?,?,?,?)";
                Object[] createDinnerParams = new Object[]{orderIdx, dinnerList.get(i).getDinnerName(), dinnerList.get(i).getStyle(), dinnerList.get(i).getAmount(), dinnerList.get(i).getDinnerPrice()};
                this.jdbcTemplate.update(createDinnerQuery, createDinnerParams);

                String lastInsertIdQuery = "select last_insert_id()";
                int dinnerIdx = this.jdbcTemplate.queryForObject(lastInsertIdQuery, int.class);

                List<PostOrderGetExtra> extraList = dinnerList.get(i).getExtraList();
                for (int j=0; j<=(extraList.size()-1); j++) {
//                    String getExtraPriceQuery = "SELECT price FROM extra WHERE extraNo = ?";
//                    String getExtraPriceParams = String.valueOf(extraList.get(j).getExtraNo());
//                    dinnerPrice += extraList.get(j).getAmount() * this.jdbcTemplate.queryForObject(getExtraPriceQuery, int.class, getExtraPriceParams);

                    String createExtraQuery = "insert into extraList (dinnerIdx, extraNo, amount) values (?,?,?)";
                    Object[] createExtraParams = new Object[]{dinnerIdx, extraList.get(j).getExtraNo(), extraList.get(j).getAmount()};
                    this.jdbcTemplate.update(createExtraQuery, createExtraParams);

                    String lastInsertIdQuery2 = "select last_insert_id()";
                    int extraIdx = this.jdbcTemplate.queryForObject(lastInsertIdQuery2, int.class);
                }
//                totalPrice += dinnerPrice;

//                String changeDinnerPriceQuery = "update dinnerList set dinnerPrice = ? where dinnerIdx = ?";
//                Object[] changeDinnerPriceParams = new Object[]{dinnerPrice, dinnerIdx};
//                this.jdbcTemplate.update(changeDinnerPriceQuery, changeDinnerPriceParams);
            }
//            String changeOrderPriceQuery = "update `order` set totalPrice = ? where orderIdx = ?";
//            Object[] changeOrderPriceParams = new Object[]{totalPrice, orderIdx};
//            this.jdbcTemplate.update(changeOrderPriceQuery, changeOrderPriceParams);

            // user 테이블에서 totalPrice 가져오기
            String getUserTotalPriceQuery = "SELECT totalPrice FROM `user` WHERE userIdx = ?";
            String getUserTotalPriceParams = String.valueOf(postOrderReq.getUserIdx());
            int userTotalPrice = this.jdbcTemplate.queryForObject(getUserTotalPriceQuery, int.class, getUserTotalPriceParams);

            // user totalPrice 업데이트
            userTotalPrice += postOrderReq.getTotalPrice();
            String changeUserTotalPriceQuery = "update `user` set totalPrice = ? where userIdx = ?";
            Object[] changeUserTotalPriceParams = new Object[]{userTotalPrice, postOrderReq.getUserIdx()};
            this.jdbcTemplate.update(changeUserTotalPriceQuery, changeUserTotalPriceParams);

        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    // RowMapper(https://velog.io/@seculoper235/RowMapper%EC%97%90-%EB%8C%80%ED%95%B4): 원하는 결과값 형태로 받기
    public List<GetOrderRes> getOrders(Integer userIdx) {
        System.out.println("dao 시작");
//        String orderIdxQuery = "SELECT orderIdx FROM `order` WHERE userIdx = ?";
//        String dinnerIdxQuery = "SELECT dinnerIdx FROM  dinnerList WHERE orderIdx = ?";
        String getOrderQuery = "SELECT orderIdx, deliveredAt, createdAt, state FROM `order` WHERE userIdx = ?";
        String getDinnersQuery = "SELECT dinnerName, `style`, amount, dinnerIdx FROM dinnerList WHERE orderIdx = ?";
        String getExtraQuery = "SELECT `name`, amount FROM extraList JOIN extra ON (extraList.extraNo = extra.extraNo AND dinnerIdx = ?)";
        List<GetOrderRes> result = this.jdbcTemplate.query(getOrderQuery,
                (rs, rowNum) -> new GetOrderRes(
                        rs.getInt("orderIdx"),
                        rs.getString("deliveredAt"),
                        rs.getString("createdAt"),
                        rs.getInt("state"),
                        this.jdbcTemplate.query(
                                getDinnersQuery,
                                (rs2, rowNum2) -> new GetOrderGetDinner(
                                        rs2.getString("dinnerName"),
                                        rs2.getString("style"),
                                        rs2.getInt("amount"),
                                        this.jdbcTemplate.query(getExtraQuery,
                                                (rs3, rowNum3) -> new GetOrderGetExtra(
                                                        rs3.getString("name"),
                                                        rs3.getInt("amount")),
                                                rs2.getInt("dinnerIdx")
                                        )),
                                rs.getInt("orderIdx")
                        )
                ), userIdx
        );
        return result;
    }

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

    public int changeStateDone(int orderIdx) {
        String changeStateDeliverQuery = "update `order` set state = 5 where orderIdx = ?";
        String changeStateDeliverParams = String.valueOf(orderIdx);
        return this.jdbcTemplate.update(changeStateDeliverQuery, changeStateDeliverParams);
    }

}