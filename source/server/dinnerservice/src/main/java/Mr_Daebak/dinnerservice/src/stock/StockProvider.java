package Mr_Daebak.dinnerservice.src.stock;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.stock.*;
import Mr_Daebak.dinnerservice.src.stock.*;
import Mr_Daebak.dinnerservice.src.stock.model.GetStockRes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.PATCH_STOCK_ERROR;

@Service
public class StockProvider {
    private final StockDao stockDao;

    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired //readme 참고
    public StockProvider(StockDao stockDao) {
        this.stockDao = stockDao;
    }

    public GetStockRes getStock(GetStockRes getStockRes) throws BaseException {
        try {
            GetStockRes getStockResResult = stockDao.getStock(getStockRes);
            return getStockResResult;
        } catch (Exception exception) {
            throw new BaseException(PATCH_STOCK_ERROR);
        }
    }
}
