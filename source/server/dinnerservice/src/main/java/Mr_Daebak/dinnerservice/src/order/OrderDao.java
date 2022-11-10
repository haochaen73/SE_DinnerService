package Mr_Daebak.dinnerservice.src.order;

import Mr_Daebak.dinnerservice.src.order.*;
import Mr_Daebak.dinnerservice.src.order.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class OrderDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public int createOrder(PostOrderReq postOrderReq) {
        System.out.println("dao 시작");
        /** cardNum 이 널인 경우 막아줘야함!! */
        String getAndModifyOrderQuery = "select address, cardNum from user where userIdx = ?";
        String userIdx = String.valueOf(postOrderReq.getUserIdx());
        GetUserAddressCardNumRes getUserAddressCardNumRes = this.jdbcTemplate.queryForObject(getAndModifyOrderQuery,
                (rs, rowNum) -> new GetUserAddressCardNumRes(
                        rs.getString("address"),
                        rs.getString("cardNum")
                ), userIdx
        );
        postOrderReq.setAddress(getUserAddressCardNumRes.getAddress());
        postOrderReq.setCardNum(getUserAddressCardNumRes.getCardNum());

        String createOrderQuery = "insert into `order`(userIdx, deliveredAt, totalprice, address, cardNum) values (?,?,?,?,?)";
        Object[] createOrderParams = new Object[]{postOrderReq.getUserIdx(), postOrderReq.getDeliveredAt(), postOrderReq.getTotalPrice(), postOrderReq.getAddress(), postOrderReq.getCardNum()};
        this.jdbcTemplate.update(createOrderQuery, createOrderParams);

        String lastInsertIdQuery = "select last_insert_id()";
        int result = this.jdbcTemplate.queryForObject(lastInsertIdQuery, int.class);
        System.out.println(result);
        return result;
    }
}