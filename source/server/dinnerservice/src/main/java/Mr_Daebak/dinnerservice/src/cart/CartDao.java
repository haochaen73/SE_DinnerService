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
import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.REQUEST_ERROR;

@Repository
public class CartDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public int HowMuchStylePrice(String style) {
        int result = 0;
        if (style.equals("Simple")) { result = 0; }
        else if (style.equals("Grand")) { result = 1000; }
        else if (style.equals("Deluxe")) { result = 2000; }
        else { result =  -1; }
        return result;
    }

    @Transactional
    public void saveCart(PostCartReq postCartReq) throws BaseException {
        try {
            System.out.println("dao 시작");
            int dinnerPrice = 0;
            List<PostCartGetDinner> dinnerList = postCartReq.getCartList();
            for (int i = 0; i <= (dinnerList.size() - 1); i++) {
                dinnerPrice = 0;
                int stylePrice = HowMuchStylePrice(dinnerList.get(i).getStyle());
                if (stylePrice == -1) {
                    throw new BaseException(REQUEST_ERROR);
                } else {
                    dinnerPrice += stylePrice;
                }
                String createDinnerQuery = "insert into cart (userIdx, dinnerName, style, amount) values (?,?,?,?)";
                Object[] createDinnerParams = new Object[]{postCartReq.getUserIdx(), dinnerList.get(i).getDinnerName(), dinnerList.get(i).getStyle(), dinnerList.get(i).getAmount()};
                this.jdbcTemplate.update(createDinnerQuery, createDinnerParams);
                System.out.println("createDinnerQuery 끝");

                String lastInsertIdQuery = "select last_insert_id()";
                int cartIdx = this.jdbcTemplate.queryForObject(lastInsertIdQuery, int.class);

                List<PostCartGetExtra> extraList = dinnerList.get(i).getExtraList();
                for (int j = 0; j <= (extraList.size() - 1); j++) {
                    String getExtraPriceQuery = "SELECT price FROM extra WHERE extraNo = ?";
                    String getExtraPriceParams = String.valueOf(extraList.get(j).getExtraNo());
                    dinnerPrice += extraList.get(j).getAmount() * this.jdbcTemplate.queryForObject(getExtraPriceQuery, int.class, getExtraPriceParams);
                    System.out.println("getExtraPriceQuery 끝");

                    String createExtraQuery = "insert into extraCartList (cartIdx, extraNo, amount) values (?,?,?)";
                    Object[] createExtraParams = new Object[]{cartIdx, extraList.get(j).getExtraNo(), extraList.get(j).getAmount()};
                    this.jdbcTemplate.update(createExtraQuery, createExtraParams);
                    System.out.println("createExtraQuery 끝");
                }
            }
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}