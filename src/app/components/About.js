export default function About() {
  return (
    <div>
      <div className="fixed top-0 right-0 w-2/3 h-3/4 rounded-[100px] m-4 pl-12 pr-4 py-10 text-white flex items-start overflow-hidden">
        <div className="flex-1 w-full h-full">
          <table className="origin-left scale-x-[0.6] w-3/2">
            <tr className="leading-tight">
              <td className="min-w-32 align-top">w</td>
              <td className="">biotope-lab.com</td>
            </tr>
            <tr className="leading-tight">
              <td className="min-w-32 align-top">t</td>
              <td className="">070-4571-9907</td>
            </tr>
            <tr className="leading-tight">
              <td className="min-w-32 align-top">m</td>
              <td className="">info@biotope-lab.com</td>
            </tr>
          </table>
        </div>
        <div className="flex-1 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <p className="origin-left scale-x-[0.6] w-3/2">
            비오톱에 관하여. 푸른 바다 위로 햇살이 반짝이며 물결이 잔잔하게
            흔들린다. 바람은 부드럽게 스쳐 지나가고, 새들은 자유롭게 하늘을
            날아오른다. 사람들의 웃음소리가 멀리서 들려오며 평화로운 오후가
            이어진다. 도시의 거리는 분주하지만 그 안에서도 따뜻한 온기가
            느껴진다. 커피 향이 골목 사이로 퍼지고, 사람들은 각자의 하루를
            살아간다. 해가 저물면 붉은 노을이 건물 사이를 물들이고, 천천히 밤이
            찾아온다. 불빛이 하나둘 켜지며 하루의 끝을 알린다.
          </p>
        </div>
      </div>
    </div>
  );
}
