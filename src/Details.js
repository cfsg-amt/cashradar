import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/system';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent, Grid, Tooltip, LinearProgress, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchStockDetails } from './redux/handlers'; // replace with the correct path

const ColorLinearProgress = styled(LinearProgress)(({ theme, index }) => ({
  height: 20,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[300],
  '& .MuiLinearProgress-bar': {
    backgroundColor: index === 0 ? theme.palette.primary.main : theme.palette.secondary.main,
  },
}));

const CustomColorLinearProgress = styled(LinearProgress)(({ theme, value }) => {
  const colors = [
    "#e93f3a", "#eb4f4a", "#ed6562", "#f49b99", "#fce3e2",
    "#d0ecdb", "#86cda2", "#49b373", "#1ca152", "#00953b",
  ];
  const index = Math.floor(value / 10); // Adjusted index calculation
  return ({
    height: 20,
    borderRadius: 5,
    backgroundColor: theme.palette.grey[300],
    '& .MuiLinearProgress-bar': {
      backgroundColor: colors[index] || theme.palette.primary.main, // fallback to primary color if index is out of range
    },
  });
});

const FourthAccordionColorLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[300],
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#878788', // color of the progress bar for the 4th accordion
  },
}));

// Apply font and color
const CustomTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[800],
  fontFamily: "SimSun",
  fontWeight: "bold",
}));

const Details = () => {
  const [stockData, setStockData] = useState(null);
  const searchName = useSelector(state => state.data.searchName);
  const region = useSelector(state => state.data.region);
  const minMaxData = useSelector(state => state.data[region].minMaxData);

  useEffect(() => {
    if (searchName !== '') {
      fetchStockDetails(region, searchName)
        .then(data => {
          console.log(data); // log fetched data
          setStockData(data);
        })
        .catch(error => console.error(`Error fetching stock details: ${error}`));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName]);  // Removed 'region' from the dependency array


  // Define the accordion groups
  const accordionGroups = [
    {
      title: '',
      fields: ['基因分析標準分數', '銷售額增長标准分数', '債務股本比例标准分数', '淨收入改善标准分数', '資本回報标准分数', '保留盈餘增長标准分数']
    },
    {
      title: '',
      fields: ['技術分析標準分數', '價格及交易量變化比率分数', '調整後移動平均線标准分数', '調整後動向指標分数', '相對強弱指數标准分数', '布林线指數标准分数']
    },
    {
      title: '其他指數',
      fields: ['相對強弱指數 (9日)', '布林线 (下線) (20日)', '波幅指數 (10日)', '移動平均線 (5日)', '每首股數', '預測1年股息回報', '分析員分數', '分析員分數變化', '大行中位目標價']
    },
  ];

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', px: 3 }}>
      {stockData && (
        <Accordion>
          <AccordionSummary>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <CustomTypography variant="h6">
                  {"時富雷達 (CR)"}: {stockData["時富雷達 (CR)"]}
                </CustomTypography>
              </Grid>
              <Grid item xs={12}>
                <CustomColorLinearProgress
                  variant="determinate"
                  value={(stockData["時富雷達 (CR)"] / 10) * 100}
                />
              </Grid>
            </Grid>
          </AccordionSummary>
        </Accordion>
      )}

      {stockData && accordionGroups.map((group, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <CustomTypography variant="h6">
                  {index < 2 ? `${group.title} ${group.fields[0]}: ${stockData[group.fields[0]]}` : group.title}
                </CustomTypography>
              </Grid>
              {index < 2 && 
                <Grid item xs={12}>
                  <ColorLinearProgress
                    variant="determinate"
                    value={(stockData[group.fields[0]] - minMaxData.min[group.fields[0]]) / (minMaxData.max[group.fields[0]] - minMaxData.min[group.fields[0]]) * 100}
                    index={index}
                  />
                </Grid>
              }
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>

              {group.fields.slice(index < 2 ? 1 : 0).map(field => (
                <Grid item xs={12} sm={6} md={4} key={field}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <CustomTypography variant="subtitle1">{field}</CustomTypography>
                        </Grid>
                        <Grid item>
                          <Tooltip title={`This is ${field}`}>
                            <InfoIcon color="action" />
                          </Tooltip>
                        </Grid>
                      </Grid>
                      <CustomTypography variant="body1" color="text.secondary">{stockData[field]}</CustomTypography>
                      {index !== 2 ?
                        <ColorLinearProgress 
                          variant="determinate" 
                          value={(stockData[field] - minMaxData.min[field]) / (minMaxData.max[field] - minMaxData.min[field]) * 100} 
                          index={index} 
                        />
                        :
                        <FourthAccordionColorLinearProgress 
                          variant="determinate" 
                          value={(stockData[field] - minMaxData.min[field]) / (minMaxData.max[field] - minMaxData.min[field]) * 100} 
                        />
                      }
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Details;
