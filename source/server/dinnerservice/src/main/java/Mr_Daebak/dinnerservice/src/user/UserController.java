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

import java.util.List;

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
    @Autowired
    private final JwtService jwtService;

    //public UserController(UserProvider userProvider, UserService userService) {
    public UserController(UserProvider userProvider, UserService userService, JwtService jwtService) {
        this.userProvider = userProvider;
        this.userService = userService;
        this.jwtService = jwtService; // JWT부분은 7주차에 다루므로 모르셔도 됩니다!
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
        if (postUserReq.getPhoneNum() == null) {
            return new BaseResponse<>(POST_USERS_EMPTY_PHONENUM);
        }
        if (postUserReq.getAddress() == null) {
            return new BaseResponse<>(POST_USERS_EMPTY_ADDRESS);
        }
        //이메일 정규표현: 입력받은 이메일이 email@domain.xxx와 같은 형식인지 검사합니다. 형식이 올바르지 않다면 에러 메시지를 보냅니다.

        // 유효성 검사
        if (!isRegexPassword(postUserReq.getPassword1())) {
            return new BaseResponse<>(POST_USERS_INVALID_PASSWORD);
        }
        if (!isRegexEmail(postUserReq.getEmail())) {
            return new BaseResponse<>(POST_USERS_INVALID_EMAIL);
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

    /**
     * 로그인 API
     * [POST] /users/logIn
     */
    @ResponseBody
    @PostMapping("/logIn")
    public BaseResponse<PostLoginRes> logIn(@RequestBody PostLoginReq postLoginReq) {
        try {
            PostLoginRes postLoginRes = userProvider.logIn(postLoginReq);
            return new BaseResponse<>(postLoginRes);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }
    }

    /**
     * 비밀번호 일치 여부 확인
     * [POST] /{userIdx}/password
     */
    @ResponseBody
    @PostMapping("/password/equal")
    public BaseResponse<String> passwordEqual(@RequestBody PostPasswordEqualReq postPasswordEqualReq) {
        try {
            String result = "이게 나오면 안돼요";
            int equal = userProvider.passwordEqual(postPasswordEqualReq);
            if (equal == 1) { result = "비밀번호가 일치합니다."; }
            return new BaseResponse<>(result);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }
    }

    /**
     * 비밀번호 변경
     * [PATCH] /modify/password
     */
    @ResponseBody
    @PatchMapping("/modify/password")
    public BaseResponse<String> modifyPassword(@RequestBody PatchPasswordReq patchPasswordReq) {
        try {
            userService.modifyPassword(patchPasswordReq);
            String result = "비밀번호가 수정되었습니다.";
            return new BaseResponse<>(result);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }
    }


    /**
     * 회원 조회 API
     * [GET] /users/{userIdx}
     */
    @ResponseBody
    @GetMapping("/{userIdx}") // (GET) 127.0.0.1:9000/app/users/:userIdx
    public BaseResponse<GetUserRes> getUserByUserIdx(@PathVariable("userIdx") Integer userIdx) {
        // @PathVariable RESTful(URL)에서 명시된 파라미터({})를 받는 어노테이션, 이 경우 userId값을 받아옴.
        //  null값 or 공백값이 들어가는 경우는 적용하지 말 것
        //  .(dot)이 포함된 경우, .을 포함한 그 뒤가 잘려서 들어감
        // Get Users
        if (userIdx == null)
            return new BaseResponse<>(GET_USERS_USERIDX_IS_NULL);
        try {
            GetUserRes getUserRes = userProvider.getUserByUserIdx(userIdx);
            return new BaseResponse<>(getUserRes);
        } catch (BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    // 이게 필요한가요?
//    /**
//     * 전체 회원 조회 API
//     * [GET] /users
//     */
//    @ResponseBody
//    @GetMapping("") // (GET) 127.0.0.1:9000/app/users/:userIdx
//    public BaseResponse<List<GetUserRes>> GetUsers() {
//        try {
//            List <GetUserRes> getUsersRes = userProvider.getUsers();
//            return new BaseResponse<>(getUsersRes);
//        } catch (BaseException exception) {
//            return new BaseResponse<>((exception.getStatus()));
//        }
//    }

    @ResponseBody
    @PatchMapping("/modify")
    public BaseResponse<String> modifyUser(@RequestBody PatchUserReq patchUserReq) {
        try {
            System.out.println("1");
//            //jwt에서 idx 추출.
//            int userIdxByJwt = jwtService.getUserIdx();
//            //userIdx와 접근한 유저가 같은지 확인
//                if(userIdx != userIdxByJwt){
//                    return new BaseResponse<>(INVALID_USER_JWT);
//                }
            System.out.println("2");
            //같다면 유저네임 변경
            userService.modifyUser(patchUserReq);

            String result = "회원정보가 수정되었습니다.";
            return new BaseResponse<>(result);
        } catch (BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @GetMapping("/totalPrice/{userIdx}")
    public BaseResponse<GetTotalPriceRes> getTotalPrice(@PathVariable("userIdx") int userIdx) {
        try {
            GetTotalPriceRes getTotalPriceRes = userProvider.getTotalPrice(userIdx);
            return new BaseResponse<>(getTotalPriceRes);
        } catch (BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}
