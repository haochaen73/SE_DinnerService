package Mr_Daebak.dinnerservice.src.employee;

import Mr_Daebak.dinnerservice.src.employee.*;
import Mr_Daebak.dinnerservice.src.employee.model.*;
import Mr_Daebak.dinnerservice.src.user.model.PostUserReq;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

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
}
