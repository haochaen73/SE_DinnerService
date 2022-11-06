package Mr_Daebak.dinnerservice.src.order;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
