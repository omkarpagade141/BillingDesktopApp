import React from 'react'
import { Container, Typography } from '@mui/material';
import PieChartComponent from './AllBillsPieChart';

function ReportPage() {
  return (
    <div>
      <Container>
      <Typography variant="h4" gutterBottom>
        Pie Chart Example
      </Typography>
      <PieChartComponent />
    </Container>
    </div>
  )
}

export default ReportPage
