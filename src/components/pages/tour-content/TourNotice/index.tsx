import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type TTourNoticeProps = {
  itemCount: number
}

const TourNotice = ({ itemCount }: TTourNoticeProps) => {
  const { isMobile } = useMediaQuery()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      id='tour-notice'
      style={{
        position: 'sticky',
        top: `${60 + itemCount * 10}px`,
        zIndex: itemCount,
      }}
    >
      <div className='flex flex-col border-t border-figma-secondary-500 bg-figma-secondary-100'>
        <h2 className='mx-auto font-noto-serif-tc font-bold text-[32px] xl:text-[64px] xl:leading-[1.2] text-figma-primary-950 py-[6px] px-4 my-10 xl:mt-13 xl:mb-12 gradient-title-border'>
          貼心提醒與參團須知
        </h2>
        <div className='flex flex-col gap-y-5 xl:mt-9 mb-[44px] xl:mb-11'>
          <div className='flex flex-col gap-y-8 pt-5 px-5 pb-[30px] mx-4 xl:pt-8 xl:px-8 xl:pb-10 xl:mx-[240px] rounded-2xl bg-figma-neutral-0'>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='22'
                height='22'
                viewBox='0 0 22 22'
                fill='none'
                className='p-1 mr-2'
              >
                <path
                  d='M13.0283 10.9922H0.984375V13.0372H8.97126V21.0155H10.9503V13.0372H13.0283V10.9922Z'
                  fill='#926D3C'
                />
                <path
                  d='M8.97266 10.9923H21.0166V8.96283H13.0297V0.984497H11.0648V8.96283H8.97266V10.9923Z'
                  fill='#926D3C'
                />
              </svg>
              <p className='font-noto-serif-body-l-semibold text-figma-secondary-950'>
                旅客篇
              </p>
            </div>
            <ol
              className={cn(
                'font-family-genseki leading-[1.5] text-figma-primary-950 list-decimal list-inside space-y-4',
                isMobile && !isExpanded ? 'max-h-80 overflow-hidden' : '',
              )}
            >
              <li>
                本行程最低出團人數為 16 人;最多為 26
                人(含機票自理之貴賓),台灣地區將派遣合格領隊隨行服務。
              </li>
              <li>
                本行程不包含進出旅館行李搬運費,疫情後人力不足,諸多飯店無法供應行李搬運服務,故系列團皆不含行李搬運。
              </li>
              <li>機票一旦開立後,則無退票價值。</li>
              <li>
                未滿 20
                歲之未成年人,未與法定代理人一同報名參加旅遊行程時,須得法定代理人之同意,報名始為有效!為確認您的報名有徵得法定代理人之同意,請您記得將旅行社所給旅遊定型化契約書或同意書,提供給您的法定代理人簽名後並繳回,報名手續始有效完成!
              </li>
              <li>
                團體旅遊時間安排需團員相互配合,為顧及全體旅客之權益,若有嬰幼兒同行時,可能無法妥適兼顧,所以請貴賓於報名時,需多方考量帶嬰幼兒同行可能產生的不便,以避免造成您和其他團員的不悅與困擾。
              </li>
              <li>
                為考量旅客自身之旅遊安全,並顧及同團其他旅客之旅遊權益,凡年滿 70
                歲以上或行動不便之貴賓,建議須有家人或友人同行,若無陪同者,請在預訂前如實告知敝公司,讓我們可以為您提供您最適合的建議,並做出相應安排(以安全為優先)。
              </li>
              <li>
                飯店房型為兩人一室,若無同行者一同報名參加,本公司得協助安排與當團其它同性別團員或領隊進行分房(但無法保證
                /
                如無法配房,須補單人房價差)。若個人需指定單人入住,請於報名時主動告知業務人員,並按房型補足單人房價差,實際價差費用,悉以當團說明公布為準。
              </li>
              <li>
                團體安排之房型皆為禁菸房,請勿在房內抽菸;若逕行於房內抽菸,經查獲須配合各旅館規範繳交鉅額罰金,通常金額約在
                100-500 歐元不等,詳細金額依照各旅館索賠為主。
              </li>
              <li>
                飯店的團體房無法指定連通房、同行親友指定在同樓層或鄰近房間,我們將向飯店提出您的需求,但無保證飯店一定提供,敬請見諒。
              </li>
              <li>
                歐式飯店建築房間規格差異大,或飯店善意升等部分房間,造成團體房間大小不一,此非本公司所能掌控,亦無差別待遇,敬請旅客諒察。
              </li>
              <li>
                如於行程中有特殊之需求,例如兒童餐、忌葷或房型一張大床或兩小床等,僅能代需求,但無法保證。特殊需求請於報名時提出以利作業。
              </li>
              <li>
                素食:因各地風俗民情不同,國外的素食習慣大多是可以食用蔥、薑、蒜、蛋、奶甚至魚等,中華餐廳大多以蔬菜、豆腐等食材料理為主;而西式餐廳則以義大利麵為主,無法如同在台灣般豐富且多變化,故建議素食貴賓能多多見諒並自行準備素食罐頭或泡麵等,以備不時之需。
              </li>
              <li>
                行程無法延長住宿天數,更改日期及航班,旅客若中途脫隊,視同自願放棄,恕不另外退費。
              </li>
              <li>
                行程於國外如遇塞車時,請貴賓們稍加耐心等候。如塞車情形嚴重,而會影響到行程或餐食的安排時,為維護旅遊品質及貴賓們的權益,我們將為您斟酌調整並妥善安排旅遊行程,敬請貴賓們諒解。
              </li>
              <li>
                本行程所載之護照、簽證相關規定,對象均為持中華民國護照之旅客,內載有國民身分證統一編號的有效中華民國護照(護照需有半年以上效期),若貴客擁有雙重國籍或持他國護照,報名時並請告知您的服務人員,則須再查明相關規定。
              </li>
              <li>
                重申歐盟加強查緝仿冒品,旅客出入境攜帶或穿著或購買仿冒商品,可處四年有期徒刑及
                37 萬 3千美金罰鍰。
              </li>
              <li>
                旅遊前或是旅途中,因天候因素、航班變更(取消)、交通工具取消或道路阻斷等不可抗力或不可歸責與旅行社之事由,導致無法依預定之旅程、交通、食宿或遊覽項目等履行時,為維護旅遊團體之安全利益,旅行社保留調整、變更行程之權利。
              </li>
              <li>
                以上表列行程,是為了讓您在出發前,能初步了解整個行程操作的情形,我們將以此為操作標準,但若遇特殊情況,在考慮行程的順暢度下,若當地導遊及領隊稍作更改,也請您見諒。
              </li>
            </ol>
            {isMobile && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className='self-center font-genseki-body-s-regular text-figma-secondary-500 py-2 px-4 border border-figma-secondary-500 rounded-[18px]'
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
          <div className='pt-5 px-5 pb-[30px] mx-4 xl:pt-8 xl:px-8 xl:pb-10 xl:mx-[240px] rounded-2xl bg-figma-neutral-0'>
            <div className='flex items-center mb-8'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='22'
                height='22'
                viewBox='0 0 22 22'
                fill='none'
                className='p-1 mr-2'
              >
                <path
                  d='M13.0283 10.9922H0.984375V13.0372H8.97126V21.0155H10.9503V13.0372H13.0283V10.9922Z'
                  fill='#926D3C'
                />
                <path
                  d='M8.97266 10.9923H21.0166V8.96283H13.0297V0.984497H11.0648V8.96283H8.97266V10.9923Z'
                  fill='#926D3C'
                />
              </svg>
              <p className='font-noto-serif-body-l-semibold text-figma-secondary-950'>
                航空篇
              </p>
            </div>
            <p className='font-family-genseki leading-[1.5] text-figma-primary-950'>
              航空公司座位安排:本行程全程使用『團體經濟艙』機票,不適用於出發前預先選位,也無法事先確認座位相關需求(如,靠窗、靠走道..等),且機上座位是航空公司依照乘客英文姓名之字母順序做統一安排,因此同行者有可能無法安排在一起,敬請參團貴賓了解。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourNotice
