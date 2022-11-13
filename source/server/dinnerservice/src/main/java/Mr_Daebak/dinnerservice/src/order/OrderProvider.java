package Mr_Daebak.dinnerservice.src.order;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.order.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderProvider {
    private final OrderDao orderDao;

    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public OrderProvider(OrderDao orderDao) {
        this.orderDao = orderDao;
    }

//    public GetOrderRes getOrder(Integer userIdx) throws BaseException {
//        try {
//            GetOrderRes getOrderRes = OrderDao.getOrder(userIdx);
//            return getOrderRes;
//        }
//    }
}
