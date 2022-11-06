package Mr_Daebak.dinnerservice.src.employee;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.config.BaseResponse;
import Mr_Daebak.dinnerservice.src.employee.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.*;
import static Mr_Daebak.dinnerservice.utils.ValidationRegex.isRegexPassword;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private final EmployeeProvider employeeProvider;
    @Autowired
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeProvider employeeProvider, EmployeeService employeeService) {
        this.employeeProvider = employeeProvider;
        this.employeeService = employeeService;
    }

    @ResponseBody
    @PostMapping("/signup")
    @Transactional
    public BaseResponse<PostEmployeeRes> createEmployee(@RequestBody PostEmployeeReq postEmployeeReq) {
        if (postEmployeeReq.getName() == null) {
            return new BaseResponse<>(POST_EMPLOYEES_EMPTY_NAME);
        }
        if (postEmployeeReq.getId() == null) {
            return new BaseResponse<>(POST_EMPLOYEES_EMPTY_ID);
        }
        if (postEmployeeReq.getPassword1() == null) {
            return new BaseResponse<>(POST_EMPLOYEES_EMPTY_PASSWORD);
        }
        if (postEmployeeReq.getPassword2() == null) {
            return new BaseResponse<>(POST_EMPLOYEES_EMPTY_PASSWORD);
        }
        if (postEmployeeReq.getCode() == null) {
            return new BaseResponse<>(POST_EMPLOYEES_EMPTY_CODE);
        }
        if (!postEmployeeReq.getCode().equals("deliciousDinner")) {
            return new BaseResponse<>(POST_EMPLOYEES_INVALID_CODE);
        }
        if (!isRegexPassword(postEmployeeReq.getPassword1())) {
            return new BaseResponse<>(POST_EMPLOYEES_INVALID_PASSWORD);
        }
        if (!postEmployeeReq.getPassword1().equals(postEmployeeReq.getPassword2())) {
            return new BaseResponse<>(POST_EMPLOYEES_NOT_MATCH);
        }
        try {
            PostEmployeeRes postEmployeeRes = employeeService.createEmployee(postEmployeeReq);
            return new BaseResponse<>(postEmployeeRes);
        } catch (BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}
