package Mr_Daebak.dinnerservice.src.stock;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.config.BaseResponse;
import Mr_Daebak.dinnerservice.src.stock.*;
import Mr_Daebak.dinnerservice.src.stock.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stocks")
public class StockController {
    // 로그 남기기
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private final StockProvider stockProvider;
    @Autowired
    private final StockService stockService;

    public StockController(StockProvider stockProvider, StockService stockService) {
        this.stockProvider = stockProvider;
        this.stockService = stockService;
    }

    @ResponseBody
    @PatchMapping("/edit")    // POST 방식의 요청을 매핑하기 위한 어노테이션
    @Transactional
    public BaseResponse<String> changeStock(@RequestBody PatchStockReq patchStockReq) {
        try {
            System.out.println("1");
            stockService.changeStock(patchStockReq);
            System.out.println("6");
            String result = "재고 수정이 완료되었습니다.";
            return new BaseResponse<>(result);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }
    }

    @ResponseBody
    @GetMapping("")
    @Transactional
    public BaseResponse<GetStockRes> getStock() {
        try {
            GetStockRes getStockRes = new GetStockRes(0,0,0,0,0,0,0,0,0,0);
            GetStockRes getStockResResult = stockProvider.getStock(getStockRes);
            return new BaseResponse<>(getStockResResult);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }
    }
}
