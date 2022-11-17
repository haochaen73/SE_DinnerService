package Mr_Daebak.dinnerservice.src.cart;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.order.OrderDao;
import Mr_Daebak.dinnerservice.src.order.model.GetOrderRes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.DATABASE_ERROR;

@Service
public class CartProvider {
    private final OrderDao orderDao;

    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public CartProvider(OrderDao orderDao) {
        this.orderDao = orderDao;
    }

    public List<GetOrderRes> getOrders(Integer userIdx) throws BaseException {
        try {
            System.out.println("provider 시작");
            List<GetOrderRes> getOrdersRes = orderDao.getOrders(userIdx);
            System.out.println("provider 끝");
            return getOrdersRes;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

}
