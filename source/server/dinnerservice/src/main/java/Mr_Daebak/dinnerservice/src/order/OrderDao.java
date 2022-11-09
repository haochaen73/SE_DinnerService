package Mr_Daebak.dinnerservice.src.order;

import Mr_Daebak.dinnerservice.src.order.*;
import Mr_Daebak.dinnerservice.src.order.model.*;
import Mr_Daebak.dinnerservice.src.user.model.*;
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

//    public int createOrder(PostOrderReq postOrderReq) {
//        String getUserQuery = "select into user(userIdx) values ?";
//        Object[] getUserParams = new Object[]{postOrderReq.getUserIdx()};
//        GetUserRes getUserByUserIdx = this.jdbcTemplate.update(getUserQuery, getUserParams);
//        String createOrderQuery = "insert into order(userIdx, deliveredAt, totalprice, address, cardNum) values (?,?,?,?,?)";
//        Object[] createOrderParams = new Object[]{postOrderReq.getUserIdx(), postOrderReq.getDeliveredAt(), postOrderReq.getTotalPrice(),getUserByUserIdx.getAddress(), getUserByUserIdx.getPhoneNum()};
//        this.jdbcTemplate.update(createOrderQuery, createOrderParams);
//
//        String lastInsertIdQuery = "select last_insert_id()";
//        return this.jdbcTemplate.queryForObject(lastInsertIdQuery, int.class);
//    }

}
