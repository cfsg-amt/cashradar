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
    backgroundColor: 
      index === 0 
        ? theme.palette.primary.main 
        : index === 1 
          ? theme.palette.secondary.main 
          : theme.palette.tertiary.main,
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
      fields: ['基因分析標準分數', '銷售額增長標準分數', '債務股本比例標準分數', '淨收入改善標準分數', '資本回報標準分數', '保留盈餘增長標準分數'],
      description: ['基本面分數（FA）。讀數從 0 最差到 10 最佳。',
        '銷售增長標準化分數 (Sg)，以公司過去 10 個報告期總收益為基礎，並計算增長模式分數。總收益是扣除銷售退回、津貼、折扣和基於銷售稅收後，由公司產生的。如果財務子公司在工業公司中，則包括在報告期內始終包括這些子公司的收入。在某些行業（例如運輸或公用事業）中，包括地方政府補貼。排除與合資企業和/或聯營企業收益額。排除公司內部收入。排除停業業務收入。',
        '槓桿情況標準化分數 (D/Eg)，使用公司過去 10 個報告期負債股本比，並計算其槓桿狀態變化。它是總負債除以股東權益總額。',
        '淨利潤改善標準化分數 (NIg)，使用公司過去 10 個報告期年度淨利潤改善。它是公司支付所有費用後獲得的利潤金額。被稱為底線或淨利潤。',
        '資本回報標準化分數 (ROCg)，使用公司過去一段時間淨收入除以投入總資本，並計算其過去 10 個報告期的變化。是投資產生的回報，用於評估公司將資本轉化為利潤的有效性。',
        '留存收益標準化分數 (REg)，使用資產負債表上的留存收益，並分析過去 10 個報告期的增長模式。是公司累積的盈餘、盈餘儉蓄或未分配利潤。包括法定儲備和當年度凈利潤。']
    },
    {
      title: '',
      fields: ['技術分析標準分數', '價格及交易量變化比率分數', '調整後移動平均線標準分數', '調整後動向指標分數', '相對強弱指數標準分數', '保力加通道指數標準分數'],
      description: ['技術分析分數（TA）。讀數從0最差到10最佳。',
        '價格及交易量變化比率 Alpha R 分數是基於價格變化和成交量變化計算，用於預測未來（5-9 天）價格趨勢。價格變化與成交量變化的矩陣可作為支持或拖累指標。',
        '調整後移動平均線 MACD 標準化分數是通過使用 MACD1 線的九日指數移動平均線（稱為信號線）計算。 MACD 信號線交叉點為技術分析中一個重要指標，用於判斷股票買入和賣出信號。MACD 標準化分數從 0 到 10，其中 0 表示最差，10 表示最佳。該分數是根據過去 10 個報告期中 MACD 指標表現進行計算。當 MACD 線向上穿越信號線時，通常被解讀為買入信號，反之亦然。', 
        '調整後動向指標 DMI 標準化分數是選定證券在一段時間內淨價格變動的度量。',
        '相對強弱指數 RSI 標準化分數是一個非趨勢指標，用於測量證券動量，以確定是否處於超買或超賣狀態。相對強度指數（RSI）讀數在0到100的範圍內擺動。70至80之間的讀數警告超買狀態，很可能遭遇向下修正。30至20之間讀數被認為是超賣條件，並警告即將出現向上修正。反轉警告發生在價格和RSI之間的分歧或匯聚之中。收益率從價格反面解釋，超過70表示超賣，低於30表示超買。',
        '保力加通道 Bollinger Band 標準化分數是一個簡單移動平均線（20期）和一個上下限帶組成，稱為保力加通道。這些通道是從移動平均線的 2 個標準差中得出。95%的股票波幅將在這個通道內捕獲。']
    },
    {
      title: '',
      fields: ['環社管(ESG)分數', '環保分數', '社會分數', '管治分數'],
      description: ['基於環境、社會和治理（ESG）數據中的披露程度的公司自有評分。該評分範圍從不披露得分中包含的任何ESG數據的公司的0分到披露每個數據點的100分。未被數據源覆蓋的公司將沒有得分，顯示N/A。跨行業和地區適用一致的主題、數據領域和權重列表。該得分所包括的主題和數據領域主要基於行業不可知框架選擇，但某些主題可能不適用於所有行業。環境（E）、社會（S）和治理（G）支柱在整體ESG披露得分中權重相等，每個支柱中的每個主題權重相等，主題權重分配到與問題有關的領域上，數量領域的權重比二進制領域大。此得分衡量公司公開報告的ESG數據量，並不衡量公司在任何數據點上的表現。',
        '基於環境、社會和治理（ESG）數據中的環境數據披露程度公司自有評分。該評分範圍從不披露得分中包含的任何環境數據的公司的0分到披露每個數據點的100分。未被數據源覆蓋的公司將沒有得分，顯示N/A。跨行業和地區適用一致的主題、數據領域和權重列表。該得分所包括的主題和數據領域主要基於行業不可知框架選擇，但某些主題可能不適用於所有行業。每個支柱中的每個主題權重相等，主題權重分配到與問題有關的領域上，數量領域的權重比二進制領域大。此得分衡量公司公開報告的環境數據量，並不衡量公司在任何數據點上的表現。',
        '基於環境、社會和治理（ESG）數據中的社會數據披露程度公司自有評分。該評分範圍從不披露得分中包含的任何社會數據的公司的0分到披露每個數據點的100分。未被數據源覆蓋的公司將沒有得分，顯示N/A。跨行業和地區適用一致的主題、數據領域和權重列表。該得分所包括的主題和數據領域主要基於行業不可知框架選擇，但某些主題可能不適用於所有行業。每個支柱中的每個主題權重相等，主題權重分配到與問題有關的領域上，數量領域的權重比二進制領域大。此得分衡量公司公開報告的社會數據量，並不衡量公司在任何數據點上的表現。',
        '基於環境、社會和治理（ESG）數據中的治理數據披露程度公司自有評分。該評分範圍從不披露得分中包含的任何治理數據的公司的0分到披露每個數據點的100分。未被數據源覆蓋的公司將沒有得分，顯示N/A。跨行業和地區適用一致的主題、數據領域和權重列表。該得分所包括的主題和數據領域主要基於行業不可知框架選擇，但某些主題可能不適用於所有行業。每個支柱中的每個主題權重相等，主題權重分配到與問題有關的領域上，數量領域的權重比二進制領域大。此得分衡量公司公開報告的治理數據量，並不衡量公司在任何數據點上的表現。']
    },
    {
      title: '其他指數',
      fields: ['相對強弱指數 (9日)', '保力加通道 (上線) (20日)', '保力加通道  (下線) (20日)', '波幅指數 (10日)', '移動平均線 (5日)', '每手股數', '預測1年股息回報', '股息回報狀況', '分析員分數', '分析員分數變化', '大行中位目標價', '中位目標價變化', '分析員數量', '大行中位目標回報', '股票價格'],
      description: ['典型RSI (9天) 信號：一個非趨勢指標，用於測量證券動量，以確定它是否處於超買或超賣狀態。相對強度指數（RSI）讀數在0到100的範圍內擺動。70至80之間的讀數警告超買狀態，很可能遭遇向下修正。30至20之間的讀數被認為是超賣條件，並警告即將出現向上修正。更重要的反轉警告發生在價格和RSI之間的分歧或匯聚之中。收益率從價格反面解釋，超過70表示超賣，低於30表示超買。',
        '保力加通道（20天）上線是從移動平均線的2個標準差（以上）中得出的。95%的股票波幅將在這個通道內捕獲。這個通道不會產生買入或賣出信號。因此，當價格貼著或穿過帶的任一側時，僅表明價格在相對基礎上高或低。而當與其他技術工具（如RSI）結合使用時，可以幫助檢測股票轉折點，提醒低風險買入/賣出機會。',
        '保力加通道（20天）下線是從移動平均線的2個標準差（以下）中得出的。95%的股票波幅將在這個通道內捕獲。這個通道不會產生買入或賣出信號。因此，當價格貼著或穿過帶的任一側時，僅表明價格在相對基礎上高或低。而當與其他技術工具（如RSI）結合使用時，可以幫助檢測股票轉折點，提醒低風險買入/賣出機會。', 
        '股票價格波動風險是通過計算歷史價格變化標準差來進行。10天價格波動率等於最近10個交易日收盤價格的相對價格變化年化標準差，表示為百分比。',
        '簡單移動平均線是通過在一定時間內（5天）對時間序列平均值進行平均構建。移動平均提供趨勢指標。',
        '股票所設的最低交易額，也是一個交易單位。每手股數因公司與其所在的證券交易所而不相同，少者二百股，多者達二千股，但以每手一千股（香港證券交易所）最為常見。',
        '在未來12個月內，預計除息日股息之總和除以目前股價。',
        '股息健康分數（DHS）是基於公司基本面和評級機構的評級計算。 DHS範圍在-100到100之間。從-100到-50，基本面表明公司無法維持目前股息支付趨勢；從-50到50，公司可能能夠維持目前股息支付趨勢；從50到100，公司有能力將其股息增加到其以前趨勢之外。',
        '投資銀行研究分析師報告有關公司目前中位數評估分數。範圍為1到5，1為最弱，5為最強。',
        '一周內投資銀行研究分析師報告中位數評級的分數變化。',
        '主要投資銀行研究分析師預的報告中位目標價格預測。這個預測目標價格是針對未來12個月投資期。',
        '一周內報告的研究分析師中位目標價格的變化。', '參與研究此公司的投行研究分析師人數。',
        '基於主要投行研究分析師中位目標價格，未來12個月價格回報。',
        '該公司最後交易價格。']
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
                  {"時富雷達 (CR)"}: {(!stockData["時富雷達 (CR)"] || isNaN(stockData["時富雷達 (CR)"])) ? "N/A" : Number(stockData["時富雷達 (CR)"]).toFixed(2)}
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
                  {index < 3 ? (
                    <Tooltip title={`${group.description[0]}`}>
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                        {`${group.title} ${group.fields[0]}: ${(!stockData[group.fields[0]] || isNaN(stockData[group.fields[0]])) ? "N/A" : Number(stockData[group.fields[0]]).toFixed(2)}`}
                        <Box sx={{ ml: 1 }}>
                          <InfoIcon color="action" />
                        </Box>
                      </Box>
                    </Tooltip>
                  ) : group.title}
                </CustomTypography>
              </Grid>

              {index < 3 && 
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
              {group.fields.slice(index < 3 ? 1 : 0).map((field, fieldIndex) => (
                <Grid item xs={12} sm={6} md={4} key={field}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <CustomTypography variant="subtitle1">{field}</CustomTypography>
                        </Grid>
                        <Grid item>
                          {/* Replace the Tooltip title with the description */}
                          <Tooltip title={`${group.description[index < 3 ? fieldIndex + 1 : fieldIndex]}`}>
                            <InfoIcon color="action" />
                          </Tooltip>
                        </Grid>
                      </Grid>
                      <CustomTypography variant="body1" color="text.secondary">{stockData[field]}</CustomTypography>
                      {index !== 3 ?
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
