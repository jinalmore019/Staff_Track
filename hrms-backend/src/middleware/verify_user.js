const { verifyToken } = require("../authentication/jwt_token");
const { EMPLOYEE_ROLE, COMPANY_ROLE } = require("../config/string");
const CompanyModel = require("../model/company_model");
const EmployeeModel = require("../model/employee_model");
const ApiError = require("../utils/error");

function verifyUser(role) {
    return async (req, _res, next) => {
        try {
            const authorization = req.headers["authorization"];
            if (!authorization) {
                return next(new ApiError(401, "Unauthorized user"));
            }
            const token = authorization.split(" ")[1];
            if (!token) {
                return next(new ApiError(401, "Unauthorized user"));
            }
            const data = verifyToken(token);

            if (!data || !data.valid) {
                if (data.expired) {
                    return next(new ApiError(401, "Token expired"));
                } else {
                    return next(new ApiError(401, "Invalid token"));
                }
            }
            const { decoded } = data;
            if (typeof role === "string") {
                if (decoded.role === role) {
                    if (role === COMPANY_ROLE) {
                        const findCompany = await CompanyModel.findById(decoded._id);
                        if (findCompany) {
                            req.id = decoded._id;
                            req.role = decoded.role;
                            req.user = findCompany;
                            return next();
                        }
                    } else if (role === EMPLOYEE_ROLE) {
                        const findEmployee = await EmployeeModel.findById(decoded._id);
                        if (findEmployee) {
                            req.id = decoded._id;
                            req.role = decoded.role;
                            req.user = findEmployee;
                            return next();
                        }
                    }
                    return next(new ApiError(401, "Unauthorized user"));
                }
            } else {
                if (role.includes(decoded.role)) {
                    if (decoded.role === COMPANY_ROLE) {
                        const findCompany = await CompanyModel.findById(decoded._id);
                        if (findCompany) {
                            req.id = decoded._id;
                            req.role = decoded.role;
                            req.user = findCompany;
                            return next();
                        }
                    } else if (decoded.role === EMPLOYEE_ROLE) {
                        const findEmployee = await EmployeeModel.findById(decoded._id);
                        if (findEmployee) {
                            req.id = decoded._id;
                            req.role = decoded.role;
                            req.user = findEmployee;
                            return next();
                        }
                    }
                    return next(new ApiError(401, "Unauthorized user"));
                }
            }
            return next(new ApiError(401, "Unauthorized user"));
        } catch (e) {
            return next(new ApiError(401, 'Unauthorized user'));
        }
    }
}

module.exports = { verifyUser };