import {useState} from "react";
import { Link } from "react-router-dom";
import '../css/co.css'

const choices = {KOKUSAIKAIKANN:'国際会館',MATUGASAKI:'松ヶ崎',KITAYAMA:'北山',KITAOOJI:'北大路',KURAMAGUTI:'鞍馬口',IMADEGAWA:'今出川',MARUTAMATI:'丸太町',KARASUMAOIKE:'烏丸御池',
    SIJYO:'四条',GOJYO:'五条',KYOTO:'京都',KUJYO:'九条',JYUJYO:'十条',KUINABASI:'くいな橋',TAKEDA:'竹田',ROKUJIZO:'六地蔵',ISHIDA:'石田',DAIGO:'醍醐',
    ONO:'小野',NAGITUJI:'椥辻',HIGASHINO:'東野',YAMASHINA:'山科',GORYOU:'御陵',KEAGE:'蹴上',HIGASHIYAMA:'東山',SANJYOUKEIHAN:'三条京阪',
    KYOTOSHIYAKUSHO:'京都市役所',KARASUMAOIKEtouzaisenn:'烏丸御池（東西線）',NIJYOUEKIMAE:'二条駅前',NIJYOU:'二条',
    NISHIOOJIOIKE:'西大路御池',UZUMASATENNJINNGAWA:'太秦天神川'}


function Co2(){

    const [selectedStart, setSelectedStart] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('');
    const [response, setResponse] = useState(null);

        // 選択された値を更新するハンドラー
        const handleStartChange = (event) => {
            setSelectedStart(event.target.value);
        };
    
        const handleGoalChange = (event) => {
            setSelectedGoal(event.target.value);
        };

            // フォーム送信ハンドラー
    const handleSubmit = async (event) => {
        event.preventDefault(); // デフォルトのフォーム送信を防止

        if (!selectedStart || !selectedGoal) {
            alert('出発駅と到着駅を選択してください。');
            return; 
        }

        const data = {
            firstChoice: selectedStart,
            secondChoice: selectedGoal
        };

        // fetch APIを使用してNode.jsサーバーにPOSTリクエストを送信
        try {
            const response = await fetch('/co2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const responseData = await response.json();
            console.log(responseData); // 応答の処理
            setResponse(responseData);
        } catch (error) {
            console.error('Sending data failed:', error);
        }
    };

    




    return(
        <div>
        <form onSubmit={handleSubmit}>
        <div>
            <p><span>●</span>出発駅</p>
            <select value={selectedStart} onChange={handleStartChange}>
                <option value=''>選択してください</option>
                {Object.entries(choices).map(([key, value]) => (
                    <option key={key} value={value}>{value}</option>
                ))}
            </select>
            <p><span>●</span>到着駅</p>
            <select value={selectedGoal} onChange={handleGoalChange}>
                <option value=''>選択してください</option>
                {Object.entries(choices).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
            </select>
</div>
        
        {response && (
        <div>    
            <div className="response-card ">
                {/*応答データを表示。実際にはresponseオブジェクトの構造に応じて適切に表示を調整する必要があります。*/} 
                <h5>距離: {JSON.stringify(response.data)}km</h5>
            </div>
            <div>
            {/* emissionsComparisonが存在する場合のみ表示 */}
            {response.emissionsComparison && (
                <div>
                <div className="response-card">
                    <h5>車のCO2排出量:<br></br> {response.emissionsComparison.carEmissions} kg</h5>
                </div>
                <div className="response-card">
                    <h5 className="center">地下鉄のCO2排出量: {response.emissionsComparison.subwayEmissions} kg</h5>
                </div>    
                <div className="response-card">
                    <h5 className="center">CO2削減量: {response.emissionsComparison.difference} kg</h5>
                </div>
            </div>
            )}
        </div>
        </div>
        )}
        
        
            <button className='Green'  type='submit'>距離・Co2計算</button>
        </form>

        {response && (
            <div>
                <Link to='/trace'>
                    <button className='Blue' type='button'>移動を記録する</button>
            </Link>
        </div>
)}

        </div>

            
    );
}

export const choice = choices; 
export default Co2;