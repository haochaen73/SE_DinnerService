package Mr_Daebak.dinnerservice.src.stock;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.config.BaseResponseStatus;
import Mr_Daebak.dinnerservice.src.stock.model.GetStockRes;
import Mr_Daebak.dinnerservice.src.stock.model.PatchStockReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.DATABASE_ERROR;

@Repository
public class StockDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public void changeStock(PatchStockReq patchStockReq) {
        System.out.println("3");
        System.out.println("amount1 : " + patchStockReq.getAmount1());
        System.out.println(patchStockReq.getClass().getName());
        this.jdbcTemplate.update("UPDATE stock SET amount = ? WHERE stockIdx = 1", patchStockReq.getAmount1());
        this.jdbcTemplate.update("UPDATE stock SET amount = ? WHERE stockIdx = 3", patchStockReq.getAmount3());
        this.jdbcTemplate.update("UPDATE stock SET amount = ? WHERE stockIdx = 4", patchStockReq.getAmount4());
        this.jdbcTemplate.update("UPDATE stock SET amount = ? WHERE stockIdx = 6", patchStockReq.getAmount6());
        this.jdbcTemplate.update("UPDATE stock SET amount = ? WHERE stockIdx = 7", patchStockReq.getAmount7());
        this.jdbcTemplate.update("UPDATE stock SET amount = ? WHERE stockIdx = 8", patchStockReq.getAmount8());
        this.jdbcTemplate.update("UPDATE stock SET amount = ? WHERE stockIdx = 9", patchStockReq.getAmount9());
        this.jdbcTemplate.update("UPDATE stock SET amount = ? WHERE stockIdx = 10", patchStockReq.getAmount10());
        System.out.println("4");
    }

    public GetStockRes getStock(GetStockRes getStockRes) {
        getStockRes.setAmount1(this.jdbcTemplate.queryForObject("SELECT amount FROM stock where stockIdx = 1", int.class));
        getStockRes.setAmount3(this.jdbcTemplate.queryForObject("SELECT amount FROM stock where stockIdx = 3", int.class));
        getStockRes.setAmount4(this.jdbcTemplate.queryForObject("SELECT amount FROM stock where stockIdx = 4", int.class));
        getStockRes.setAmount6(this.jdbcTemplate.queryForObject("SELECT amount FROM stock where stockIdx = 6", int.class));
        getStockRes.setAmount7(this.jdbcTemplate.queryForObject("SELECT amount FROM stock where stockIdx = 7", int.class));
        getStockRes.setAmount8(this.jdbcTemplate.queryForObject("SELECT amount FROM stock where stockIdx = 8", int.class));
        getStockRes.setAmount9(this.jdbcTemplate.queryForObject("SELECT amount FROM stock where stockIdx = 9", int.class));
        getStockRes.setAmount10(this.jdbcTemplate.queryForObject("SELECT amount FROM stock where stockIdx = 10", int.class));
        return getStockRes;
    }
}
