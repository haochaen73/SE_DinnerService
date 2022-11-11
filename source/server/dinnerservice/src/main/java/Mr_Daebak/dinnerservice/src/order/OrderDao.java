package Mr_Daebak.dinnerservice.src.order;

import Mr_Daebak.dinnerservice.src.order.*;
import Mr_Daebak.dinnerservice.src.order.model.*;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

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
        int orderIdx = this.jdbcTemplate.queryForObject(lastInsertIdQuery, int.class);

        return orderIdx;
    }


    public ArrayList<ArrayList> createDinner(PostOrderReq postOrderReq, int orderIdx) {
        ArrayList<Dinner> dinnerList = new ArrayList<>();
        ArrayList<Integer> dinnerIdxList = new ArrayList<>();
        ArrayList<Integer> extraIdxList = new ArrayList<>();
        ArrayList<ArrayList> result = new ArrayList<ArrayList>();

        dinnerList = postOrderReq.getDinnerList();
        for (int i=0; i< dinnerList.size(); i++) {
            String createDinnerQuery = "insert into dinnerList (orderIdx, dinnerNo, style, amount) values (?,?,?,?)";
            Object[] createDinnerParams = new Object[]{orderIdx, dinnerList.get(i).getDinnerno(), dinnerList.get(i).getStyle(), dinnerList.get(i).getAmount()};
            this.jdbcTemplate.update(createDinnerQuery, createDinnerParams);

            String lastInsertIdQuery = "select last_insert_id()";
            int dinnerIdx = this.jdbcTemplate.queryForObject(lastInsertIdQuery, int.class);
            dinnerIdxList.add(dinnerIdx);

            ArrayList<Extra> extraList = new ArrayList<>();
            extraList = dinnerList.get(i).getExtraList();
            for (int j=0; j<extraList.size(); j++) {
                String createExtraQuery = "insert into extraList (dinnerIdx, extraNo, amount) values (?,?,?)";
                Object[] createExtraParams = new Object[]{dinnerIdx, extraList.get(j).getExtraNo(), extraList.get(j).getAmount()};
                this.jdbcTemplate.update(createExtraQuery, createExtraParams);
                String lastInsertIdQuery2 = "select last_insert_id()";
                int extraIdx = this.jdbcTemplate.queryForObject(lastInsertIdQuery2, int.class);
                extraIdxList.add(extraIdx);
                result.add(extraIdxList);
            }
            result.add(dinnerIdxList);
        }
        return result;
    }

}