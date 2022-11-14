package Mr_Daebak.dinnerservice.src.stock;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.stock.model.GetStockRes;
import Mr_Daebak.dinnerservice.src.stock.model.PatchStockReq;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.PATCH_STOCK_ERROR;

@Service
public class StockService {
    final Logger logger = LoggerFactory.getLogger(this.getClass()); // Log 처리부분: Log를 기록하기 위해 필요한 함수입니다.

    private final StockDao stockDao;
    private final StockProvider stockProvider;

    @Autowired
    public StockService(StockDao stockDao, StockProvider stockProvider) {
        this.stockDao = stockDao;
        this.stockProvider = stockProvider;
    }

    public void changeStock(PatchStockReq patchStockReq) throws BaseException {
        try {
            System.out.println("2");
            stockDao.changeStock(patchStockReq);
            System.out.println("5");
        } catch (Exception exception) {
            throw new BaseException(PATCH_STOCK_ERROR);
        }
    }


}
