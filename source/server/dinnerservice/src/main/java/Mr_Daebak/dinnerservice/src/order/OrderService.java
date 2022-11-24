package Mr_Daebak.dinnerservice.src.order;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.order.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public int createOrder(PostOrderReq postOrderReq) throws BaseException {
        try {
            System.out.println("service 시작");
            int orderIdx = orderDao.createOrder(postOrderReq);
            System.out.println("dao 끝");
            return orderIdx;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public void deleteStock(PatchOrderReq patchOrderReq) throws BaseException {
        try {
            orderDao.deleteStock(patchOrderReq);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int createNewDinner(PatchOrderReq patchOrderReq) throws BaseException {
        try {
            int dinnerIdx = orderDao.createNewDinnerExtra(patchOrderReq);
            return dinnerIdx;
        } catch (Exception exception) {
            throw new BaseException(POST_ORDERS_STARVATION_STOCK);
        }
    }

    public void deleteOrder(int orderIdx) throws BaseException {
        try {
            orderDao.deleteOrder(orderIdx);
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

    public int changeStateComplete(int orderIdx) throws BaseException{
        try {
            int state = orderDao.changeStateComplete(orderIdx);
            if (state == 0) {
                throw new BaseException(MODIFY_FAIL_STATE);
            }
            return state;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int changeStateDeliver(int orderIdx) throws BaseException{
        try {
            int state = orderDao.changeStateDeliver(orderIdx);
            if (state == 0) {
                throw new BaseException(MODIFY_FAIL_STATE);
            }
            return state;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int changeStateDone(int orderIdx) throws BaseException{
        try {
            int state = orderDao.changeStateDone(orderIdx);
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
