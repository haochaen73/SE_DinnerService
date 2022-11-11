package Mr_Daebak.dinnerservice.src.order;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.order.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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

    public int createOrder(PostOrderReq postOrderReq) throws BaseException {
        try {
            System.out.println("dao 시작");
            /** cardNum 이 널인 경우 막아줘야함!! */
            String getAndModifyOrderQuery = "select address from user where userIdx = ?";
            String userIdx = String.valueOf(postOrderReq.getUserIdx());
            System.out.println("getUserAddressCardNumRes 시작");
            GetUserAddressRes getUserAddressCardNumRes = this.jdbcTemplate.queryForObject(getAndModifyOrderQuery,
                    (rs, rowNum) -> new GetUserAddressRes(
                            rs.getString("address")
                    ), userIdx
            );
            System.out.println("getUserAddressCardNumRes 끝");
            postOrderReq.setAddress(getUserAddressCardNumRes.getAddress());
            System.out.println(postOrderReq.getAddress());

            System.out.println("create Order 시작");
            String createOrderQuery = "insert into `order`(userIdx, deliveredAt, totalprice, address, cardNum) values (?,?,?,?,?)";
            Object[] createOrderParams = new Object[]{postOrderReq.getUserIdx(), postOrderReq.getDeliveredAt(), postOrderReq.getTotalPrice(), postOrderReq.getAddress(), postOrderReq.getCardNum()};
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


    public void createDinnerExtra(PostOrderReq postOrderReq, int orderIdx) throws BaseException {
        try {
            System.out.println("createDinnerExtra 시작");
            List<GetDinner> dinnerList = postOrderReq.getDinnerList();
            for (int i=0; i< dinnerList.size(); i++) {
                String createDinnerQuery = "insert into dinnerList (orderIdx, dinnerNo, style, amount) values (?,?,?,?)";
                Object[] createDinnerParams = new Object[]{orderIdx, dinnerList.get(i).getDinnerNo(), dinnerList.get(i).getStyle(), dinnerList.get(i).getAmount()};
                System.out.println("createDinner 시작");
                this.jdbcTemplate.update(createDinnerQuery, createDinnerParams);
                System.out.println("createDinner 끝");

                String lastInsertIdQuery = "select last_insert_id()";
                int dinnerIdx = this.jdbcTemplate.queryForObject(lastInsertIdQuery, int.class);

                List<GetExtra> extraList = dinnerList.get(i).getExtraList();
                for (int j=0; j<extraList.size(); j++) {
                    System.out.println("createExtra 시작");
                    String createExtraQuery = "insert into extraList (dinnerIdx, extraNo, amount) values (?,?,?)";
                    Object[] createExtraParams = new Object[]{dinnerIdx, extraList.get(j).getExtraNo(), extraList.get(j).getAmount()};
                    this.jdbcTemplate.update(createExtraQuery, createExtraParams);
                    System.out.println("createExtra 끝");
                    String lastInsertIdQuery2 = "select last_insert_id()";
                    int extraIdx = this.jdbcTemplate.queryForObject(lastInsertIdQuery2, int.class);
                }
            }
            System.out.println("createDinnerExtra 끝");
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int changeStateAccept(int orderIdx) {
        System.out.println("3");
        String changeStateAcceptQuery = "update `order` set state = 2 where orderIdx = ?";
        String changeStateAcceptParams = String.valueOf(orderIdx);
        return this.jdbcTemplate.update(changeStateAcceptQuery, changeStateAcceptParams);
    }

}