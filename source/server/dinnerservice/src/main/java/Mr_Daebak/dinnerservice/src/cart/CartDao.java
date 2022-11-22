package Mr_Daebak.dinnerservice.src.cart;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.cart.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.util.List;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.DATABASE_ERROR;

@Repository
public class CartDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Transactional
    public int saveCart(PostCartReq postCartReq) throws BaseException {
        try {
            System.out.println("dao 시작");
            String createCartQuery = "insert into cart (userIdx, dinnerName, style, amount, dinnerPrice) values (?,?,?,?,?)";
            Object[] createCartParams = new Object[]{postCartReq.getUserIdx(), postCartReq.getDinnerName(), postCartReq.getStyle(), postCartReq.getAmount(), postCartReq.getDinnerPrice()};
            this.jdbcTemplate.update(createCartQuery, createCartParams);
            System.out.println("createDinnerQuery 끝");

            System.out.println("lastInsertIdQuery 시작");
            String lastInsertIdQuery = "select last_insert_id()";
            int cartIdx = this.jdbcTemplate.queryForObject(lastInsertIdQuery, int.class);
            System.out.println("lastInsertIdQuery 끝 : " + cartIdx);

            List<PostCartGetExtra> extraList = postCartReq.getExtraList();
            for (int j = 0; j <= (extraList.size() - 1); j++) {
                String createExtraQuery = "insert into extraCartList (cartIdx, extraNo, amount) values (?,?,?)";
                Object[] createExtraParams = new Object[]{cartIdx, extraList.get(j).getExtraNo(), extraList.get(j).getAmount()};
                this.jdbcTemplate.update(createExtraQuery, createExtraParams);
                System.out.println("createExtraQuery 끝");
            }
            return cartIdx;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public List<GetCartRes> getCarts(Integer userIdx) {
        System.out.println("dao 시작");
//        String orderIdxQuery = "SELECT orderIdx FROM `order` WHERE userIdx = ?";
//        String dinnerIdxQuery = "SELECT dinnerIdx FROM  dinnerList WHERE orderIdx = ?";
        String getCartsQuery = "SELECT cartIdx, dinnerName, `style`, amount, dinnerPrice FROM cart WHERE userIdx = ?";
        String getExtraQuery = "SELECT `name`, amount FROM extraCartList JOIN extra ON (extraCartList.extraNo = extra.extraNo AND cartIdx = ?)";
        List<GetCartRes> result = this.jdbcTemplate.query(
                getCartsQuery,
                (rs2, rowNum2) -> new GetCartRes(
                        rs2.getInt("cartIdx"),
                        rs2.getString("dinnerName"),
                        rs2.getString("style"),
                        rs2.getInt("amount"),
                        rs2.getInt("dinnerPrice"),
                        this.jdbcTemplate.query(getExtraQuery,
                                (rs3, rowNum3) -> new GetCartGetExtra(
                                        rs3.getString("name"),
                                        rs3.getInt("amount")),
                                rs2.getInt("cartIdx")
                        )),
                userIdx
        );
        return result;
    }
    public void deleteCart(Integer cartIdx) {
        System.out.println("dao 시작");
        String deleteCartListQuery = "DELETE FROM extraCartList WHERE cartIdx = ?";
        this.jdbcTemplate.update(deleteCartListQuery, cartIdx);
        String deleteCartQuery = "DELETE FROM cart WHERE cartIdx = ?";
        this.jdbcTemplate.update(deleteCartQuery, cartIdx);
    }
}