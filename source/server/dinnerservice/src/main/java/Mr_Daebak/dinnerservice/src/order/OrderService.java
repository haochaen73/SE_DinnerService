package Mr_Daebak.dinnerservice.src.order;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.order.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.*;

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

    public int createOrder(PostOrderReq postOrderReq) throws BaseException {
        try {
            System.out.println("service 시작");
            int orderIdx = orderDao.createOrder(postOrderReq);
            orderDao.createDinnerExtra(postOrderReq, orderIdx);
            System.out.println("dao 끝");
            return orderIdx;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int changeStateAccept(int orderIdx) throws BaseException{
        try {
            int state = orderDao.changeStateAccept(orderIdx);
            if (state == 0) {
                throw new BaseException(MODIFY_FAIL_STATE);
            }
            return state;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int changeStateDelete(int orderIdx) throws BaseException{
        try {
            int state = orderDao.changeStateDelete(orderIdx);
            if (state == 0) {
                throw new BaseException(MODIFY_FAIL_STATE);
            }
            return state;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int changeStateStart(int orderIdx) throws BaseException{
        try {
            int state = orderDao.changeStateStart(orderIdx);
            if (state == 0) {
                throw new BaseException(MODIFY_FAIL_STATE);
            }
            return state;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

//
//    public void createDinner(PostOrderReq postOrderReq) throws BaseException {
//        try {
//
//        } catch (Exception exception) {
//            throw new BaseException(DATABASE_ERROR);
//        }
//    }
//
//    public void createExtra(PostOrderReq postOrderReq) throws BaseException {
//        try {
//
//        } catch (Exception exception) {
//            throw new BaseException(DATABASE_ERROR);
//        }
//    }

//    public PostDinnerRes createDinner(PostDinnerReq postDinnerReq) throws BaseException {
//        try {
//            int dinnerIdx = orderDao.createDinner(postDinnerReq);
//            return new PostDinnerRes(dinnerIdx);
//        } catch (Exception exception) {
//            throw new BaseException(DATABASE_ERROR);
//        }
//    }
}
