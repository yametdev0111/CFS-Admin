import { Container } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { receive, receiveDetailReview, receiveRecent } from "../redux/actions";
import './../App.css';

const valueFormatter = value => `${value}%`;

const series = [
  {
    data: [0, 0, 0, 0, 0],
    label: '🙁',
    stack: 'total',
    color: '#70AD47',
    valueFormatter
  },
  {
    data: [0, 0, 0, 0, 0],
    label: '😐',
    stack: 'total',
    color: '#FFC000',
    valueFormatter
  },
  {
    data: [0, 0, 0, 0, 0],
    label: '🙂',
    stack: 'total',
    color: '#ED7D31',
    valueFormatter
  }
];

const title = [
  'Wait Time',
  'Staff Friendliness',
  'Cleanliness',
  'Value and Prices',
  'Quality of Products'
];

const AdminPage = () => {
  const chartSetting = {
    width: 500,
    height: 300,
  };
  const dispatch = useDispatch();

  const review_normal = useSelector(state => state.review);
  const review_detail = useSelector(state => state.reviewdetail);
  const [detail, setDetail] = useState(series);
  const recent = useSelector(state => state.reviewrecent);

  useEffect(() => {
    dispatch(receive());
    dispatch(receiveDetailReview());
    dispatch(receiveRecent(10));
  }, [dispatch])

  useEffect(() => {
    setDetail(review_detail.map(val => ({
      ...val,
      valueFormatter
    })));
  }, [review_detail])

  return (
    <Container
      maxWidth={false}
      sx={{
        alignItems: "center",
        height: "100vh",
      }}
    >
      <BarChart
        dataset={review_normal}
        yAxis={[ {
          scaleType: 'band',
          dataKey: 'level'
        } ]}
        series={[ {
          dataKey: 'percentage',
          label: '',
          color:"#D9D9D9",
          valueFormatter
        } ]}
        xAxis={[{
          label: 'Percentage (%)',
          min: 0,
          max: 100,
        }]}
        layout="horizontal"
        {...chartSetting}
      />
      
      <BarChart
        yAxis={[{ scaleType: 'band', data: title }]}
        xAxis={[{
          label: 'Percentage (%)',
          min: 0,
          max: 100,
        }]}
        series={detail}
        layout="horizontal"
        {...chartSetting}
      />

      <table className="cfstable">
        <thead className="cfsrow">
          <td className="cfscell">Stars</td>
          <td className="cfscell">Comments</td>
          <td className="cfscell">Time</td>
          <td className="cfscell">Date</td>
        </thead>
        {recent.map(val =>
          <tr className="cfsrow">
            <td className="cfscell">{val.rating}</td>
            <td className="cfscell">{val.review}</td>
            <td className="cfscell">{val.createdAt.time}</td>
            <td className="cfscell">{val.createdAt.date}</td>
          </tr>
        )}
      </table>
    </Container>
  );
};

export default AdminPage;
