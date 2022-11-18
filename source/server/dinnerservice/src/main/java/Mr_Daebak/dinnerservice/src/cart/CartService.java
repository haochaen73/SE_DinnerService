package Mr_Daebak.dinnerservice.src.cart;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.cart.model.PostCartReq;
import Mr_Daebak.dinnerservice.src.cart.model.PostCartRes;
import Mr_Daebak.dinnerservice.src.order.OrderDao;
import Mr_Daebak.dinnerservice.src.order.OrderProvider;
import Mr_Daebak.dinnerservice.src.order.model.PostOrderReq;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.DATABASE_ERROR;
import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.MODIFY_FAIL_STATE;

@Service
public class CartService {
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final CartDao cartDao;
    private final CartProvider cartProvider;

    @Autowired
    public CartService(CartDao cartDao, CartProvider cartProvider) {
        this.cartDao = cartDao;
        this.cartProvider = cartProvider;
    }

    @Transactional
    public PostCartRes saveCart(PostCartReq postCartReq, Integer userIdx) throws BaseException {
        try {
            System.out.println("service 시작");
            int cartIdx = cartDao.saveCart(postCartReq, userIdx);
            System.out.println("dao 끝");
            return new PostCartRes(cartIdx);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    @Transactional
    public void deleteCart(Integer cartIdx) throws BaseException {
        try {
            System.out.println("service 시작");
            cartDao.deleteCart(cartIdx);
            System.out.println("dao 끝");
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
