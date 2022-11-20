package Mr_Daebak.dinnerservice.src.user;

import Mr_Daebak.dinnerservice.config.*;
import Mr_Daebak.dinnerservice.config.secret.Secret;
import Mr_Daebak.dinnerservice.src.user.model.*;
import Mr_Daebak.dinnerservice.utils.AES128;
import Mr_Daebak.dinnerservice.utils.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.*;

@Service
public class UserService {
    final Logger logger = LoggerFactory.getLogger(this.getClass()); // Log 처리부분: Log를 기록하기 위해 필요한 함수입니다.

    private final UserDao userDao;
    private final UserProvider userProvider;
    private final JwtService jwtService;

    @Autowired //readme 참고
    //public UserService(UserDao userDao, UserProvider userProvider) {
    public UserService(UserDao userDao, UserProvider userProvider, JwtService jwtService) {
        this.userDao = userDao;
        this.userProvider = userProvider;
        this.jwtService = jwtService;
    }

    // 회원가입(POST)
    public PostUserRes createUser(PostUserReq postUserReq) throws BaseException {
        // 중복 확인: 해당 이메일을 가진 유저가 있는지 확인합니다. 중복될 경우, 에러 메시지를 보냅니다.

        if (userProvider.checkId(postUserReq.getId()) == 1) {
            throw new BaseException(POST_USERS_EXISTS_ID);
        }
        if (userProvider.checkEmail(postUserReq.getEmail()) == 1) {
            throw new BaseException(POST_USERS_EXISTS_EMAIL);
        }
        /*
        if (userProvider.checkPhoneNum(postUserReq.getPhoneNum()) == 1) {
            throw new BaseException(POST_USERS_EXISTS_PHONENUM);
        }
         */

        String pwd;
        try {
            // 암호화: postUserReq에서 제공받은 비밀번호를 보안을 위해 암호화시켜 DB에 저장합니다.
            // ex) password123 -> dfhsjfkjdsnj4@!$!@chdsnjfwkenjfnsjfnjsd.fdsfaifsadjfjaf
            pwd = new AES128(Secret.USER_INFO_PASSWORD_KEY).encrypt(postUserReq.getPassword1()); // 암호화코드
            postUserReq.setPassword1(pwd);
            System.out.println(postUserReq.getPassword1());
        } catch (Exception ignored) { // 암호화가 실패하였을 경우 에러 발생
            throw new BaseException(PASSWORD_ENCRYPTION_ERROR);
        }
        try {
            int userIdx = userDao.createUser(postUserReq);
//            String jwt = jwtService.createJwt(userIdx);
//            return new PostUserRes(userIdx, jwt);
            return new PostUserRes(userIdx);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public void modifyUser(PatchUserReq patchUserReq) throws BaseException{
        try {
            System.out.println("3");
            userDao.modifyUser(patchUserReq);
            System.out.println("4");
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
