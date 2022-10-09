package Mr_Daebak.dinnerservice.src.user;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.utils.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.DATABASE_ERROR;

@Service
public class UserProvider {
    private final UserDao userDao;
    //private final JwtService jwtService; // JWT부분은 7주차에 다루므로 모르셔도 됩니다!


    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired //readme 참고
    public UserProvider(UserDao userDao) {
    //public UserProvider(UserDao userDao, JwtService jwtService) {
        this.userDao = userDao;
        //this.jwtService = jwtService; // JWT부분은 7주차에 다루므로 모르셔도 됩니다!
    }

    // 해당 아이디가 이미 User Table에 존재하는지 확인
    public int checkId(String id) throws BaseException {
        try {
            System.out.println("넌 뭐가 문제니 id");
            return userDao.checkId(id);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    // 해당 이메일가 이미 User Table에 존재하는지 확인
    public int checkEmail(String email) throws BaseException {
        try {
            System.out.println("넌 뭐가 문제니 email");
            return userDao.checkEmail(email);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    /*
    // 해당 핸드폰번호가 이미 User Table에 존재하는지 확인
    public int checkPhoneNum(String phonenNum) throws BaseException {
        try {
            System.out.println("넌 뭐가 문제니 phone");
            return userDao.checkPhoneNum(phonenNum);
        } catch (Exception exception) {
            System.out.println("넌 뭐가 문제니 phone2");
            throw new BaseException(DATABASE_ERROR);
        }
    }
    */
}
