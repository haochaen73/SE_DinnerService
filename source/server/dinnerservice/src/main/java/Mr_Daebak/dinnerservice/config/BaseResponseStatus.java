package Mr_Daebak.dinnerservice.config;

import lombok.Getter;

/**
 * 에러 코드 관리
 */
@Getter
public enum BaseResponseStatus {
    /**
     * 1000 : 요청 성공
     */
    SUCCESS(true, 1000, "요청에 성공하였습니다."),


    /**
     * 2000 : Request 오류
     */
    // Common
    REQUEST_ERROR(false, 2000, "입력값을 확인해주세요."),
    EMPTY_JWT(false, 2001, "JWT를 입력해주세요."),
    INVALID_JWT(false, 2002, "유효하지 않은 JWT입니다."),
    INVALID_USER_JWT(false,2003,"권한이 없는 유저의 접근입니다."),

    // users
    USERS_EMPTY_USER_ID(false, 2010, "유저 아이디 값을 확인해주세요."),

    // [POST] /users
    POST_USERS_EMPTY_NAME(false, 2011, "유저 이름을 입력해주세요."),
    POST_USERS_EMPTY_ID(false, 2012, "유저 아이디를 입력해주세요."),
    POST_USERS_EMPTY_PASSWORD(false, 2013, "유저 비밀번호를 입력해주세요."),
    POST_USERS_EMPTY_EMAIL(false, 2014, "유저 이메일을 입력해주세요."),
    POST_USERS_EMPTY_ADDRESS(false, 2015, "유저 주소를 입력해주세요."),
    POST_USERS_EMPTY_PHONENUM(false, 2016, "유저 핸드폰번호를 입력해주세요."),

    POST_USERS_INVALID_PASSWORD(false, 2018, "비밀번호 형식을 확인해주세요."),
    POST_USERS_INVALID_EMAIL(false, 2019, "이메일 형식을 확인해주세요."),
    POST_USERS_INVALID_BIRTHDAY(false, 2020, "생일 형식을 확인해주세요."),
    POST_USERS_INVALID_PHONENUM(false, 2021, "핸드폰번호 형식을 확인해주세요."),

    POST_USERS_NOT_MATCH(false, 2022, "비밀번호가 일치하지 않습니다."),
    //
    POST_USERS_EXISTS_ID(false,2023,"중복된 아이디입니다."),
    POST_USERS_EXISTS_EMAIL(false,2024,"중복된 이메일입니다."),
    POST_USERS_EXISTS_PHONENUM(false,2025,"중복된 번호입니다."),
    GET_USERS_USERIDX_IS_NULL(false, 2026, "user 인덱스 값이 널입니다."),


    // [POST] /employees
    POST_EMPLOYEES_EMPTY_NAME(false, 2030, "직원 이름을 입력해주세요."),
    POST_EMPLOYEES_EMPTY_ID(false, 2031, "직원 아이디를 입력해주세요."),
    POST_EMPLOYEES_EMPTY_PASSWORD(false, 2032, "직원 비밀번호를 입력해주세요."),
    POST_EMPLOYEES_EMPTY_CODE(false, 2033, "직원 코드를 입력해주세요."),
    POST_EMPLOYEES_INVALID_PASSWORD(false, 2034, "유효하지 않은 비밀번호입니다."),
    POST_EMPLOYEES_INVALID_CODE(false, 2035, "유효하지 않은 직원 코드입니다."),
    POST_EMPLOYEES_NOT_MATCH(false, 2036, "비밀번호가 일치하지 않습니다."),

    POST_EMPLOYEES_EXISTS_ID(false, 2037, "중복된 아이디입니다"),

    // /orders
    // POST_ORDERS
    MODIFY_FAIL_STATE(false, 2041, "상태 변경에 실패했습니다."),
    /**
     * 3000 : Response 오류
     */
    // Common
    RESPONSE_ERROR(false, 3000, "값을 불러오는데 실패하였습니다."),

    // [POST] /users
    DUPLICATED_PHONENUMBER(false, 3013, "중복된 핸드폰번호입니다."),
    FAILED_TO_LOGIN(false,3014,"없는 아이디거나 비밀번호가 틀렸습니다."),


    PATCH_STOCK_ERROR(false, 2050, "재고 수정에 실패했습니다."),
    /**
     * 4000 : Database, Server 오류
     */
    DATABASE_ERROR(false, 4000, "데이터베이스 연결에 실패하였습니다."),
    SERVER_ERROR(false, 4001, "서버와의 연결에 실패하였습니다."),

    //[PATCH] /users/{userIdx}
    MODIFY_FAIL_USERNAME(false,4014,"유저네임 수정 실패"),
    MODIFY_FAIL_PRODUCTNAME(false,4015,"상품네임 수정 실패"),
    MODIFY_FAIL_PRICE(false,4016,"가격 수정 실패"),
    MODIFY_FAIL_CATEGORY(false,4017,"카테고리 수정 실패"),
    MODIFY_FAIL_STATUS(false,4018,"유저 비활성화 실패"),

    PASSWORD_ENCRYPTION_ERROR(false, 4011, "비밀번호 암호화에 실패하였습니다."),
    PASSWORD_DECRYPTION_ERROR(false, 4012, "비밀번호 복호화에 실패하였습니다.");


    // 5000 : 필요시 만들어서 쓰세요
    // 6000 : 필요시 만들어서 쓰세요


    private final boolean isSuccess;
    private final int code;
    private final String message;

    private BaseResponseStatus(boolean isSuccess, int code, String message) { //BaseResponseStatus 에서 각 해당하는 코드를 생성자로 맵핑
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
    }
}
