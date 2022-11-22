package Mr_Daebak.dinnerservice.src.user;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.user.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.POST_USERS_FAIL_LOGIN;

@Repository
public class UserDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    // 회원가입
    public int createUser(PostUserReq postUserReq) {
        String createUserQuery = "insert into `user` (name, id, password, email, phoneNum, address) values (?,?,?,?,?,?)";
        Object[] createUserParams = new Object[]{postUserReq.getName(), postUserReq.getId(), postUserReq.getPassword1(),postUserReq.getEmail(), postUserReq.getPhoneNum(), postUserReq.getAddress()};
        this.jdbcTemplate.update(createUserQuery, createUserParams);

        String lastInsertIdQuery = "select last_insert_id()";
        return this.jdbcTemplate.queryForObject(lastInsertIdQuery, int.class);
    }

    // 아이디 확인
    public int checkId(String id) {
        String checkIdQuery = "select exists(select id from `user` where id = ?)";
        String checkIdParams = id;
        return this.jdbcTemplate.queryForObject(checkIdQuery,
                int.class,
                checkIdParams); // checkIdQuery, checkEmailParams를 통해 가져온 값(intgud)을 반환한다. -> 쿼리문의 결과(존재하지 않음(False,0),존재함(True, 1))를 int형(0,1)으로 반환됩니다.
    }

    // 이메일 확인
    public int checkEmail(String email) {
        String checkEmailQuery = "select exists(select email from user where email = ?)";
        String checkEmailParams = email;
        return this.jdbcTemplate.queryForObject(checkEmailQuery,
                int.class,
                checkEmailParams); // checkEmail, checkEmailParams를 통해 가져온 값(intgud)을 반환한다. -> 쿼리문의 결과(존재하지 않음(False,0),존재함(True, 1))를 int형(0,1)으로 반환됩니다.
    }

    // 이메일 확인
    public int checkPhoneNum(String phoneNum) {
        String checkPhoneNumQuery = "select exists(select phoneNum from user where phoneNum = ?)";
        String checkPhoneNumParams = phoneNum;
        return this.jdbcTemplate.queryForObject(checkPhoneNumQuery,
                int.class,
                checkPhoneNumParams); // checkPhoneNum, checkEmailParams를 통해 가져온 값(intgud)을 반환한다. -> 쿼리문의 결과(존재하지 않음(False,0),존재함(True, 1))를 int형(0,1)으로 반환됩니다.
    }

    // 로그인: 해당 email에 해당되는 user의 암호화된 비밀번호 값을 가져온다.
    public User getPwd(PostLoginReq postLoginReq) throws BaseException {
        try {
            String getPwdQuery = "select userIdx, name, id, password, email, phoneNum, address, totalPrice from user where id = ?"; // 해당 email을 만족하는 User의 정보들을 조회한다.
            String getPwdParams = postLoginReq.getId(); // 주입될 email값을 클라이언트의 요청에서 주어진 정보를 통해 가져온다.

            return this.jdbcTemplate.queryForObject(getPwdQuery,
                    (rs, rowNum) -> new User(
                            rs.getInt("userIdx"),
                            rs.getString("name"),
                            rs.getString("id"),
                            rs.getString("password"),
                            rs.getString("email"),
                            rs.getString("phoneNum"),
                            rs.getString("address"),
                            rs.getInt("totalPrice")
                    ), // RowMapper(위의 링크 참조): 원하는 결과값 형태로 받기
                    getPwdParams
            ); // 한 개의 회원정보를 얻기 위한 jdbcTemplate 함수(Query, 객체 매핑 정보, Params)의 결과 반환
        } catch (Exception exception) {
            throw new BaseException(POST_USERS_FAIL_LOGIN);
        }
    }

    // 로그인: 해당 email에 해당되는 user의 암호화된 비밀번호 값을 가져온다.
    public User modifyGetPwd(PostPasswordEqualReq postPasswordEqualReq) {
        String modifyPwdQuery = "select userIdx, name, id, password, email, phoneNum, address, totalPrice from user where userIdx = ?"; // 해당 email을 만족하는 User의 정보들을 조회한다.
        int modifyPwdParams = postPasswordEqualReq.getUserIdx(); // 주입될 email값을 클라이언트의 요청에서 주어진 정보를 통해 가져온다.

        return this.jdbcTemplate.queryForObject(modifyPwdQuery,
                (rs, rowNum) -> new User(
                        rs.getInt("userIdx"),
                        rs.getString("name"),
                        rs.getString("id"),
                        rs.getString("password"),
                        rs.getString("email"),
                        rs.getString("phoneNum"),
                        rs.getString("address"),
                        rs.getInt("totalPrice")
                ), // RowMapper(위의 링크 참조): 원하는 결과값 형태로 받기
                modifyPwdParams
        ); // 한 개의 회원정보를 얻기 위한 jdbcTemplate 함수(Query, 객체 매핑 정보, Params)의 결과 반환
    }

    // 비밀번호 수정
    public void modifyPassword(PatchPasswordReq patchPasswordReq) {
        String modifyPasswordQuery = "UPDATE `user` SET password = ? WHERE userIdx = ?";
        Object[] modifyPasswordParams = new Object[]{patchPasswordReq.getPassword1(), patchPasswordReq.getUserIdx()};
        this.jdbcTemplate.update(modifyPasswordQuery, modifyPasswordParams);
    }

    // getUserByUserIdx
    public GetUserRes getUserByUserIdx(Integer userIdx) {
        String getUserByUserIdxQuery = "select userIdx, name, id, password, email, phoneNum, address, totalPrice from user where userIdx = ?"; // 해당 email을 만족하는 User의 정보들을 조회한다.
        String getUserByUserIdxParams = String.valueOf(userIdx);

        return this.jdbcTemplate.queryForObject(getUserByUserIdxQuery,
                (rs, rowNum) -> new GetUserRes(
                        rs.getInt("userIdx"),
                        rs.getString("name"),
                        rs.getString("id"),
                        rs.getString("password"),
                        rs.getString("email"),
                        rs.getString("phoneNum"),
                        rs.getString("address"),
                        rs.getInt("totalPrice")
                ), // RowMapper(위의 링크 참조): 원하는 결과값 형태로 받기
                getUserByUserIdxParams
        );
    }

    public void modifyUser(PatchUserReq patchUserReq) {
        System.out.println("5");
        String modifyUserQuery = "update `user` set name = ?, email = ?, phoneNum = ?, address = ?  where userIdx = ?";
        Object[] modifyUserParams = new Object[]{patchUserReq.getName(), patchUserReq.getEmail(), patchUserReq.getPhoneNum(), patchUserReq.getAddress(), patchUserReq.getUserIdx()};
        this.jdbcTemplate.update(modifyUserQuery, modifyUserParams);
        System.out.println("6");
    }

    public GetTotalPriceRes getTotalPrice(Integer userIdx) {
        String getTotalPriceQuery = "SELECT totalPrice FROM user WHERE userIdx = ?";
        String getTotalPriceParams = String.valueOf(userIdx);
        int totalPrice = this.jdbcTemplate.queryForObject(getTotalPriceQuery, int.class, getTotalPriceParams);
        return new GetTotalPriceRes(totalPrice);
    }

}
