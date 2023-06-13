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
      title: 'Others',
      fields: ['相對強弱指數 (9日)', '布林线 (下線) (20日)', '波幅指數 (10日)', '移動平均線 (5日)', '每首股數', '預測1年股息回報', '分析員分數', '分析員分數變化', '大行中位目標價']
    },
  ];

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', px: 3 }}> {/* px for some padding */}
      {stockData && accordionGroups.map((group, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <CustomTypography variant="h6">{`${group.title} ${group.fields[0]}: ${stockData[group.fields[0]]}`}</CustomTypography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {group.fields.map(field => (
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
                      <Typography variant="body1" color="text.secondary">{stockData[field]}</Typography> {/* use MUI's secondary text color */}
                      <ColorLinearProgress 
                        variant="determinate" 
                        value={(stockData[field] - minMaxData.min[field]) / (minMaxData.max[field] - minMaxData.min[field]) * 100} 
                        index={index} 
                      />
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
