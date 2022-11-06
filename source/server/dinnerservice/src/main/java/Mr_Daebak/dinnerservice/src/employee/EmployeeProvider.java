package Mr_Daebak.dinnerservice.src.employee;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.user.UserDao;
import Mr_Daebak.dinnerservice.utils.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.DATABASE_ERROR;

@Service
public class EmployeeProvider {
    private final EmployeeDao employeeDao;
    private final JwtService jwtService;

    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired //readme 참고
    //public UserProvider(UserDao userDao) {
    public EmployeeProvider(EmployeeDao employeeDao, JwtService jwtService) {
        this.employeeDao = employeeDao;
        this.jwtService = jwtService;
    }

    // 해당 아이디가 이미 Employee Table에 존재하는지 확인
    public int checkId(String id) throws BaseException {
        try {
            return employeeDao.checkId(id);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
