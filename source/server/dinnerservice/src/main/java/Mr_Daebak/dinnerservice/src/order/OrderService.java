package Mr_Daebak.dinnerservice.src.order;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.order.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.DATABASE_ERROR;

@Service
public class OrderService {
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final OrderDao orderDao;
    private final OrderProvider orderProvider;

    @Autowired
    public OrderService(OrderDao orderDao, OrderProvider orderProvider) {
        this.orderDao = orderDao;
        this.orderProvider = orderProvider;
    }

//    public PostOrderRes createOrder(PostOrderReq postOrderReq) throws BaseException {
//        try {
//            int orderIdx = OrderDao.createOrder(postOrderReq);
//            return new PostOrderRes(orderIdx);
//        } catch (Exception exception) {
//            throw new BaseException(DATABASE_ERROR);
//        }
//    }
}
