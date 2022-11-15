package Mr_Daebak.dinnerservice.src.user;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.config.BaseResponseStatus;
import Mr_Daebak.dinnerservice.config.secret.Secret;
import Mr_Daebak.dinnerservice.src.user.model.*;
import Mr_Daebak.dinnerservice.utils.AES128;
import Mr_Daebak.dinnerservice.utils.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.*;

@Service
public class UserProvider {
    private final UserDao userDao;
    private final JwtService jwtService; // JWT부분은 7주차에 다루므로 모르셔도 됩니다!


    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired //readme 참고
    //public UserProvider(UserDao userDao) {
    public UserProvider(UserDao userDao, JwtService jwtService) {
        this.userDao = userDao;
        this.jwtService = jwtService;
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

    // 로그인(password 검사)
    public PostLoginRes logIn(PostLoginReq postLoginReq) throws BaseException {
        User user = userDao.getPwd(postLoginReq);
        String password;
        try {
            password = new AES128(Secret.USER_INFO_PASSWORD_KEY).decrypt(user.getPassword()); // 암호화
            // 회원가입할 때 비밀번호가 암호화되어 저장되었기 떄문에 로그인을 할때도 암호화된 값끼리 비교를 해야합니다.
        } catch (Exception ignored) {
            throw new BaseException(PASSWORD_DECRYPTION_ERROR);
        }

        if (postLoginReq.getPassword().equals(password)) { //비말번호가 일치한다면 userIdx를 가져온다.
            int userIdx = userDao.getPwd(postLoginReq).getUserIdx();
            // return new PostLoginRes(userIdx);
            // jwt
            String jwt = JwtService.createJwt(userIdx);
            return new PostLoginRes(userIdx, jwt);
        } else { // 비밀번호가 다르다면 에러메세지를 출력한다.
            throw new BaseException(FAILED_TO_LOGIN);
        }
    }

    // getUserByUserIdx
    public GetUserRes getUserByUserIdx(Integer userIdx) throws BaseException {
        try {
            GetUserRes getUserRes = userDao.getUserByUserIdx(userIdx);
            return getUserRes;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

//    public List<GetUserRes> getUsers() throws BaseException {
//        try {
//            List <GetUserRes> getUsersRes = userDao.getUsers();
//            return getUsersRes;
//        } catch (Exception exception) {
//            throw new BaseException(DATABASE_ERROR);
//        }
//    }

    public GetTotalPriceRes getTotalPrice(Integer userIdx) throws BaseException {
        try {
            GetTotalPriceRes getTotalPriceRes = userDao.getTotalPrice(userIdx);
            return getTotalPriceRes;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
