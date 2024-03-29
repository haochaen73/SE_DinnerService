package Mr_Daebak.dinnerservice.src.order;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.order.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.DATABASE_ERROR;

@Service
public class OrderProvider {
    private final OrderDao orderDao;

    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public OrderProvider(OrderDao orderDao) {
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

    public List<GetOrderStateRes> getOrderAccept() throws BaseException {
        try {
            System.out.println("provider 시작");
            List<GetOrderStateRes> GetOrderAcceptRes = orderDao.getOrderAccept();
            System.out.println("provider 끝");
            return GetOrderAcceptRes;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public List<GetOrderStateRes> getOrderPrepare() throws BaseException {
        try {
            System.out.println("provider 시작");
            List<GetOrderStateRes> getOrderPrepareRes = orderDao.getOrderPrepare();
            System.out.println("provider 끝");
            return getOrderPrepareRes;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public List<GetOrderStateRes> getOrderDone() throws BaseException {
        try {
            System.out.println("provider 시작");
            List<GetOrderStateRes> getOrderDoneRes = orderDao.getOrderDone();
            System.out.println("provider 끝");
            return getOrderDoneRes;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

}
