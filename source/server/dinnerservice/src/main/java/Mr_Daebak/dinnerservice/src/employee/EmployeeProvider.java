package Mr_Daebak.dinnerservice.src.employee;

import Mr_Daebak.dinnerservice.config.BaseException;
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

    // 로그인(password 검사)
    public PostEmpLoginRes logIn(PostEmpLoginReq postEmpLoginReq) throws BaseException {
        System.out.println("2");
        Employee employee = employeeDao.getPwd(postEmpLoginReq);
        System.out.println("5");
//        String password = employee.getPassword();
        String password;
        try {
            password = new AES128(Secret.USER_INFO_PASSWORD_KEY).decrypt(employee.getPassword()); // 암호화
            // 회원가입할 때 비밀번호가 암호화되어 저장되었기 떄문에 로그인을 할때도 암호화된 값끼리 비교를 해야합니다.
        } catch (Exception ignored) {
            throw new BaseException(PASSWORD_DECRYPTION_ERROR);
        }

        if (postEmpLoginReq.getPassword().equals(password)) { //비말번호가 일치한다면 userIdx를 가져온다.
            System.out.println("6");
            int employeeIdx = employeeDao.getPwd(postEmpLoginReq).getEmployeeIdx();
            String name = employeeDao.getPwd(postEmpLoginReq).getName();
//            jwt
//            String jwt = JwtService.createEmpJwt(employeeIdx);
//            return new PostEmpLoginRes(employeeIdx, name, jwt);
            return new PostEmpLoginRes(employeeIdx, name);
        } else { // 비밀번호가 다르다면 에러메세지를 출력한다.
            throw new BaseException(POST_USERS_FAIL_LOGIN);
        }
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
