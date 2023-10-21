import { Container } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { receive, receiveDetailReview, receiveRecent } from "../redux/actions";
import './../App.css';

const valueFormatter = value => `${value===null?"0":value.toFixed(1)}%`;

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
  const [average, setAverage] = useState(0);
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

  useEffect(() => {
    var sum = 0.0;
    review_normal.forEach( ( val, index ) => {
      sum = sum + val.percentage * (5 - index) / 100;
    } )
    setAverage(sum.toFixed(1));
  }, [review_normal])

  return (
    <Container
      maxWidth={false}
      sx={{
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Feedback Dashboard</h1>
      <h2>Feedback Review Summary</h2>
      <p>Average ⭐ Stars:{average}</p>
      <p>Total Reviews: {recent.length}</p>
      <BarChart
        dataset={review_normal.reverse()}
        yAxis={[ {
          scaleType: 'band',
          dataKey: 'level'
        } ]}
        series={[ {
          dataKey: 'percentage',
          label: '⭐',
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
        {recent.reverse().map(val =>
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
