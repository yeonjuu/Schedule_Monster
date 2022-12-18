// import styled, { css } from "styled-components";

// const Day = styled.div<{
//   prevMonth: boolean;
//   nextMonth: boolean;
//   week: string;
//   today: boolean;
// }>`
//   width: 100%;
//   height: 100%;
//   background-color: white;
//   border: solid 0.5px lightgray;
//   ${(props) =>
//     !props.prevMonth &&
//     css`
//       color: rgba(0, 0, 0, 0.5);
//     `}
//   ${(props) =>
//     !props.nextMonth &&
//     css`
//       opacity: 0.3;
//     `}
//       ${(props) =>
//     props.today &&
//     css`
//       font-weight: bold;
//       font-size: large;
//       text-decoration: underline;
//     `}
//     ${(props) =>
//     props.week == 'Sun'
//       ? css`
//           color: red;
//         `
//       : props.week == 'Sat'
//       ? css`
//           color: blue;
//         `
//       : null}
// `;

// const Date = () => {
//     return (
//         <Day></Day>
//     )
// };

// export default Date;
