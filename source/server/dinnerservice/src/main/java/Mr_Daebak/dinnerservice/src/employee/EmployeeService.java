package Mr_Daebak.dinnerservice.src.employee;

import Mr_Daebak.dinnerservice.config.*;
import Mr_Daebak.dinnerservice.config.secret.Secret;
import Mr_Daebak.dinnerservice.src.employee.model.*;
import Mr_Daebak.dinnerservice.utils.AES128;
import Mr_Daebak.dinnerservice.utils.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.*;

@Service
public class EmployeeService {
    final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final EmployeeDao employeeDao;
    private final EmployeeProvider employeeProvider;
    private final JwtService jwtService;

    @Autowired
    public EmployeeService(EmployeeDao employeeDao, EmployeeProvider employeeProvider, JwtService jwtService) {
        this.employeeDao = employeeDao;
        this.employeeProvider = employeeProvider;
        this.jwtService = jwtService;
    }

    public PostEmployeeRes createEmployee(PostEmployeeReq postEmployeeReq) throws BaseException {
        if (employeeProvider.checkId(postEmployeeReq.getId()) == 1) {
            throw new BaseException(POST_EMPLOYEES_EXISTS_ID);
        }
        String pwd;
        try {
            pwd = new AES128(Secret.EMPLOYEE_INFO_PASSWORD_KEY).encrypt(postEmployeeReq.getPassword1()); // 암호화코드
            postEmployeeReq.setPassword1(pwd);
            System.out.println(postEmployeeReq.getPassword1());
        } catch (Exception ignored) {
            throw new BaseException(PASSWORD_ENCRYPTION_ERROR);
        }
        try {
            int employeeIdx = employeeDao.createEmployee(postEmployeeReq);
//            String jwt = jwtService.createJwt(employeeIdx);
//            return new PostEmployeeRes(employeeIdx, jwt);
            return new PostEmployeeRes(employeeIdx);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
