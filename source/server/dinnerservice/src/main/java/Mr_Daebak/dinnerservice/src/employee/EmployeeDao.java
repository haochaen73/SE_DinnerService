package Mr_Daebak.dinnerservice.src.employee;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.src.employee.*;
import Mr_Daebak.dinnerservice.src.employee.model.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.POST_USERS_FAIL_LOGIN;

@Repository
public class EmployeeDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }
    // 회원가입
    public int createEmployee(PostEmployeeReq postEmployeeReq) {
        String createEmployeeQuery = "insert into employee(name, id, password) values (?,?,?)";
        Object[] createEmployeeParams = new Object[]{postEmployeeReq.getName(), postEmployeeReq.getId(), postEmployeeReq.getPassword1()};
        this.jdbcTemplate.update(createEmployeeQuery, createEmployeeParams);

        String lastInsertIdQuery = "select last_insert_id()";
        return this.jdbcTemplate.queryForObject(lastInsertIdQuery, int.class);
    }

    // 아이디 확인
    public int checkId(String id) {
        String checkIdQuery = "select exists(select id from employee where id = ?)";
        String checkIdParams = id;
        return this.jdbcTemplate.queryForObject(checkIdQuery,
                int.class,
                checkIdParams); // checkIdQuery, checkEmailParams를 통해 가져온 값(intgud)을 반환한다. -> 쿼리문의 결과(존재하지 않음(False,0),존재함(True, 1))를 int형(0,1)으로 반환됩니다.
    }

    // 로그인: 해당 email에 해당되는 user의 암호화된 비밀번호 값을 가져온다.
    public Employee getPwd(PostEmpLoginReq postEmpLoginReq) throws BaseException {
        try {
            System.out.println("3");
            String getPwdQuery = "select employeeIdx, name, id, password from employee where id = ?"; // 해당 email을 만족하는 User의 정보들을 조회한다.
            String getPwdParams = postEmpLoginReq.getId(); // 주입될 email값을 클라이언트의 요청에서 주어진 정보를 통해 가져온다.

            Employee employee = this.jdbcTemplate.queryForObject(getPwdQuery,
                    (rs, rowNum) -> new Employee(
                            rs.getInt("employeeIdx"),
                            rs.getString("name"),
                            rs.getString("id"),
                            rs.getString("password")
                    ), // RowMapper(위의 링크 참조): 원하는 결과값 형태로 받기
                    getPwdParams
            ); // 한 개의 회원정보를 얻기 위한 jdbcTemplate 함수(Query, 객체 매핑 정보, Params)의 결과 반환
            System.out.println("4");
            return employee;
        } catch (Exception exception) {
            throw new BaseException(POST_USERS_FAIL_LOGIN);
        }
    }
}
