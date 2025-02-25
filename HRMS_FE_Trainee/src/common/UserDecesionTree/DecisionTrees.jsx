import React, { useEffect, useRef } from "react";
import DecisionTree from "./tree";

const DecisionTrees = ({ division }) => {
  console.log(division, "division");
  // const tableResponsiveRef = useRef(null);
  // useEffect(() => {
  //   if (division.language === "ar") {
  //     tableResponsiveRef.current.scrollLeft =
  //       tableResponsiveRef.current.scrollWidth;
  //   }
  // }, [division.language]);
  return (
    <div
      className="table-responsive1"
      id="table-responsive1"
      style={{
        overflow: "scroll",
        padding: "10px 20px 10px 10px",
        // background: 'blueviolet',
      }}
    >
      <table
        className={`mt-5 ${
          division.language === "ar"
            ? "table-direction-arabic"
            : "table-direction-english"
        }`}
      >
        <tbody>
          <tr
            className={`${
              division.language === "ar"
                ? "text-direction-arabic"
                : "text-direction-english"
            }`}
          ></tr>
          <tr>
            <td colSpan={division.tournament_rounds_length}>
              <DecisionTree
                hSpacing={30}
                vSpacing={10}
                lineColor="#344767"
                direction={division.language === "ar" ? "ltr" : "ltr"}
                data={division.leader}
                renderContent={({ data }) => {
                  console.log(data, "data-----");
                  return (
                    <div className="card player-box card-outline card-default text-center">
                      {data?.project?.projectTitle ? (
                        <div
                          className={
                            data.children !== undefined
                              ? "user-details"
                              : "last-user-details"
                          }
                        >
                          <div className="user-details-name" style={{backgroundColor: '#422b72',justifyContent:'center',padding:15,borderRadius:10}}>
                            <h3
                              style={{
                                fontSize: "25px",
                                fontWeight:'600',
                                color: "#fff",
                                textTransform: "capitalize",
                                lineHeight: "24px",
                              }}
                            >
                              {data?.project?.projectTitle}
                            </h3>
                            <h6
                              style={{
                                fontSize: "15px",
                                fontWeight: 500,
                                color: "#fff",
                                textTransform: "capitalize",
                              }}
                            >
                              {data?.project?.clientName}
                            </h6>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={
                            data.children !== undefined
                              ? "user-details"
                              : "last-user-details"
                          }
                        >
                          <div className="user-details-image">
                            <img
                              src={
                                "https://bobbyhadz.com/images/blog/react-usestate-dynamic-key/thumbnail.webp"
                              }
                              alt=""
                              style={{
                                height: "100%",
                                width: "100%",
                                borderRadius: "100px",
                                background: "red",
                              }}
                            />
                          </div>
                          <div className="user-details-name">
                            <h3
                              style={{
                                fontSize: "22px",
                                color: "#2a90f0",
                                textTransform: "capitalize",
                                lineHeight: "24px",
                              }}
                            >{`${data.firstName} ${data.lastName}`}</h3>
                            <h6
                              style={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#f00",
                                textTransform: "capitalize",
                              }}
                            >
                              {/* {data.designation.name} */}
                            </h6>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }}
              ></DecisionTree>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DecisionTrees;