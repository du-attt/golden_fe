import { useEffect, useState } from "react";
import { getTop10 } from "../api/apiServices";
import loadingImage from "../assets/loading.png";
import nodataImage from "../assets/nodata.jpg";
const Home = () => {
    const [columnResult, setColumnResult] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModel, setShowModel] = useState(false);
    const [name, setName] = useState('A');
    const [columnNames, setColumnName] = useState<any []>([]);
    const subjectGroup = ['A', 'B', 'C', 'D', 'A1'];
    
    const getColumnName = (name: string): string[] => {
        switch (name) {
          case 'A':
            return ["SBD", "Toán", "Vật Lí", "Hóa Học", "Tổng điểm"];
          case 'B':
            return ["SBD", "Toán", "Hóa Học", "Sinh Học", "Tổng điểm"];
          case 'C':
            return ["SBD", "Ngữ Văn", "Lịch Sử", "Địa Lí", "Tổng điểm"];
          case 'D':
            return ["SBD", "Toán", "Ngữ Văn", "Ngoại Ngữ", "Tổng điểm"];
          case 'A1':
            return ["SBD", "Toán", "Vật Lí", "Ngoại Ngữ", "Tổng điểm"];
          default:
            return [];
        }
      };
      const getColumnRow = (row: any, name: string) => {
        switch (name) {
            case 'A':
                return [row.sbd, row.toan, row.vat_li, row.hoa_hoc, row.tong_diemA.toFixed(2)];
            case 'B':
                return [row.sbd, row.toan, row.hoa_hoc, row.sinh_hoc, row.tong_diemB.toFixed(2)];
            case 'C':
                return [row.sbd, row.ngu_van, row.lich_su, row.dia_li, row.tong_diemC.toFixed(2)];
            case 'D':
                return [row.sbd, row.toan, row.ngu_van, row.ngoai_ngu, row.tong_diemD.toFixed(2)];
            case 'A1':
                return [row.sbd, row.toan, row.vat_li, row.ngoai_ngu, row.tong_diemA1.toFixed(2)];
            default:
                return [];
        }
    };
    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            const columns = getColumnName(name);
            setColumnName(columns);
            try {
                const result = await getTop10(name);
                console.log("API Response:", result);

                if (!Array.isArray(result)) {
                    throw new Error("Dữ liệu trả về không hợp lệ!");
                }

                const formattedResult = result.map((item) => ({
                    sbd: item.sbd ?? "--",
                    toan: item.toan ?? "--",
                    vat_li: item.vat_li ?? "--",
                    hoa_hoc: item.hoa_hoc ?? "--",
                    ngu_van: item.ngu_van ?? "--",
                    sinh_hoc: item.sinh_hoc ?? "--",
                    ngoai_ngu: item.ngoai_ngu ?? "--",
                    lich_su: item.lich_su ?? "--",
                    dia_li: item.dia_li ?? "--",
                    tong_diemA:
                        (parseFloat(item.toan) || 0) +
                        (parseFloat(item.vat_li) || 0) +
                        (parseFloat(item.hoa_hoc) || 0),
                    tong_diemB:
                        (parseFloat(item.toan) || 0) +
                        (parseFloat(item.sinh_hoc) || 0) +
                        (parseFloat(item.hoa_hoc) || 0),
                    tong_diemC:
                        (parseFloat(item.ngu_van) || 0) +
                        (parseFloat(item.lich_su) || 0) +
                        (parseFloat(item.dia_li) || 0),
                    tong_diemD:
                        (parseFloat(item.toan) || 0) +
                        (parseFloat(item.ngu_van) || 0) +
                        (parseFloat(item.ngoai_ngu) || 0),
                    tong_diemA1:
                        (parseFloat(item.toan) || 0) +
                        (parseFloat(item.vat_li) || 0) +
                        (parseFloat(item.ngoai_ngu) || 0),
                }));

                setColumnResult(formattedResult);
            } catch (err) {
                console.error("API Error:", err);
                setError("Không thể tải dữ liệu. Vui lòng thử lại!");
                setColumnResult([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [name]);

    return (
        <div className="flex flex-col items-center justify-start overflow-x-auto" style={{marginTop: 100}}>
            <div className="flex flex-row justify-between items-start w-full bg-gray-300 p-4">
                <p className="text-lg font-bold text-center">DANH SÁCH TOP 10 HỌC SINH KHỐI {name}</p>
                <div className="relative items-center justify-center cursor-pointer hover:bg-gray-100 pl-4 pr-4 rounded-full border"
                onClick={() => setShowModel(!showModel)}>
                    <p className="text-lg font-bold" style={{ userSelect: "none", pointerEvents: "auto" }}>Bộ Lọc</p>
                </div>
            </div>
            {loading ? (
                <div className="flex flex-col items-center justify-center animate-pulse min-h-[400px]">
                <img src={loadingImage} alt="No data available" className="opacity-70 mt-10 w-48 h-48" />
                <p className="mt-10 text-xl font-semibold text-blue-600">Dữ liệu đang được tải xuống...</p>
            </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center mt-20">
                    <img src={nodataImage} alt="No data available" className="w-1/2 opacity-70" />
                    <p className="text-center text-red-500 font-semibold w-full">{error}</p>
                </div>
            ) : columnResult.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20">
                    <img src={nodataImage} alt="No data available" className="w-1/2 opacity-70" />
                    <p className="mt-4 text-gray-500 text-lg font-semibold">Chưa có dữ liệu để hiển thị</p>
                </div>
            ) : (
                <div className="w-full bg-gray-300 p-4 mt-2">
                    <div className="overflow-x-auto w-full"> 
                        <table className="w-full min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    {columnNames.map((nameValue, i) => (
                                        <th key={i} className="border border-gray-300 px-4 py-2 text-left">{nameValue}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {columnResult.map((row, index) => (
                                    <tr key={index}>
                                    {getColumnRow(row, name).map((data, i) => (
                                        <td key={i} className="border border-gray-300 px-4 py-2">{data}</td>
                                    ))}
                                </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {showModel && (
                <div className="absolute mt-15 right-4 w-64 bg-white border shadow-lg rounded-lg p-4 transition-transform duration-300">
                    <div className="absolute -top-2 right-8 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                    <h2 className="text-xl font-bold mb-4">Bộ Lọc</h2>
                    
                    <label className="block mb-2">Chọn Khối:</label>
                    <select
                        className="w-full border rounded p-2"
                        value={name}
                        onChange={(e) =>{
                            setName(e.target.value);
                            setShowModel(false);
                            console.log(name)
                        }}
                    >
                        {subjectGroup.map((group, index) => (
                            <option key={index} value={group}>
                            {group}
                            </option>
                        ))}
                    </select>
                    <div className="flex justify-end mt-4">
                        <button
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                            onClick={() => setShowModel(false)}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;