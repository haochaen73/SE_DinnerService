package Mr_Daebak.dinnerservice.src.user;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.config.BaseResponse;
import Mr_Daebak.dinnerservice.src.user.*;
import Mr_Daebak.dinnerservice.src.user.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import Mr_Daebak.dinnerservice.utils.JwtService;
import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.*;
import static Mr_Daebak.dinnerservice.utils.ValidationRegex.*;


@RestController
@RequestMapping("/users")
public class UserController {
    // 로그 남기기
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private final UserProvider userProvider;
    @Autowired
    private final UserService userService;
    //@Autowired
    //private final JwtService jwtService;

    public UserController(UserProvider userProvider, UserService userService) {
    //public UserController(UserProvider userProvider, UserService userService, JwtService jwtService) {
        this.userProvider = userProvider;
        this.userService = userService;
        //this.jwtService = jwtService; // JWT부분은 7주차에 다루므로 모르셔도 됩니다!
    }

    /**
     * 회원가입 API
     * [POST] /users
     */
    // Body
    @ResponseBody
    @PostMapping("/signup")    // POST 방식의 요청을 매핑하기 위한 어노테이션
    @Transactional
    public BaseResponse<PostUserRes> createUser(@RequestBody PostUserReq postUserReq) {
        //  @RequestBody란, 클라이언트가 전송하는 HTTP Request Body(우리는 JSON으로 통신하니, 이 경우 body는 JSON)를 자바 객체로 매핑시켜주는 어노테이션
        // null 검사
        if (postUserReq.getName() == null) {
            return new BaseResponse<>(POST_USERS_EMPTY_NAME);
        }
        if (postUserReq.getId() == null) {
            return new BaseResponse<>(POST_USERS_EMPTY_ID);
        }
        if (postUserReq.getPassword1() == null) {
            return new BaseResponse<>(POST_USERS_EMPTY_PASSWORD);
        }
        if (postUserReq.getPassword2() == null) {
            return new BaseResponse<>(POST_USERS_EMPTY_PASSWORD);
        }
        if (postUserReq.getEmail() == null) {
            return new BaseResponse<>(POST_USERS_EMPTY_EMAIL);
        }
        if (postUserReq.getAddress() == null) {
            return new BaseResponse<>(POST_USERS_EMPTY_ADDRESS);
        }
        if (postUserReq.getBirthDate() == null) {
            return new BaseResponse<>(POST_USERS_EMPTY_BIRTHDATE);
        }
        if (postUserReq.getPhoneNum() == null) {
            return new BaseResponse<>(POST_USERS_EMPTY_PHONENUM);
        }
        //이메일 정규표현: 입력받은 이메일이 email@domain.xxx와 같은 형식인지 검사합니다. 형식이 올바르지 않다면 에러 메시지를 보냅니다.

        // 유효성 검사
        if (!isRegexPassword(postUserReq.getPassword1())) {
            return new BaseResponse<>(POST_USERS_INVALID_PASSWORD);
        }
        if (!isRegexEmail(postUserReq.getEmail())) {
            return new BaseResponse<>(POST_USERS_INVALID_EMAIL);
        }
        if (!isRegexBirthDate(postUserReq.getBirthDate())) {
            return new BaseResponse<>(POST_USERS_INVALID_BIRTHDAY);
        }
        if (!isRegexPhoneNum(postUserReq.getPhoneNum())) {
            return new BaseResponse<>(POST_USERS_INVALID_PHONENUM);
        }

        if (!postUserReq.getPassword1().equals(postUserReq.getPassword2())) {
            return new BaseResponse<>(POST_USERS_NOT_MATCH);
        }
        try {
            PostUserRes postUserRes = userService.createUser(postUserReq);
            return new BaseResponse<>(postUserRes);
        } catch (BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}
