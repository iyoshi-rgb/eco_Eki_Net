import {useState} from "react";

function Co2(){
    const choices = {KOKUSAIKAIKANN:'国際会館',MATUGASAKI:'松ヶ崎',KITAYAMA:'北山',KITAOOJI:'北大路',KURAMAGUTI:'鞍馬口',IMADEGAWA:'今出川',MARUTAMATI:'丸太町',KARASUMAOIKE:'烏丸御池',
    SIJYO:'四条',GOJYO:'五条',KYOTO:'京都',KUJYO:'九条',JYUJYO:'十条',KUINABASI:'くいな橋',TAKEDA:'竹田',ROKUJIZO:'六地蔵',ISHIDA:'石田',DAIGO:'醍醐',
    ONO:'小野',NAGITUJI:'椥辻',HIGASHINO:'東野',YAMASHINA:'山科',GORYOU:'御陵',KEAGE:'蹴上',HIGASHIYAMA:'東山',SANJYOUKEIHAN:'三条京阪',
    KYOTOSHIYAKUSHO:'京都市役所',KARASUMAOIKEtouzaisenn:'烏丸御池（東西線）',NIJYOUEKIMAE:'二条駅前',NIJYOU:'二条',
    NISHIOOJIOIKE:'西大路御池',UZUMASATENNJINNGAWA:'太秦天神川'}

    const [selectedStart, setSelectedStart] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('');

        // 選択された値を更新するハンドラー
        const handleStartChange = (event) => {
            setSelectedStart(event.target.value);
        };
    
        const handleGoalChange = (event) => {
            setSelectedGoal(event.target.value);
        };

            // フォーム送信ハンドラー
    const handleSubmit = async (event) => {
         // デフォルトのフォーム送信を防止

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
        } catch (error) {
            console.error('Sending data failed:', error);
        }
    };

    




    return(
        <form onSubmit={handleSubmit}>
        <div>
            <select value={selectedStart} onChange={handleStartChange}>
                駅を選択してください。
                {Object.entries(choices).map(([key, value]) => (
                    <option key={key} value={value}>{value}</option>
                ))}
            </select>
            <select value={selectedGoal} onChange={handleGoalChange}>
                駅を選択してください。
                {Object.entries(choices).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
            </select>
        </div>
        <button type="submit">送信</button>
        </form>
    )
}

export default Co2;