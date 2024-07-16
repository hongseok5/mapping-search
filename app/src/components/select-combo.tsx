import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Bucket {
  key: string;
}

const SelectComponent: React.FC = () => {
  const [upperOptions, setUpperOptions] = useState<string[]>([]);   // 테이블
  const [selectedUpper, setSelectedUpper] = useState<string>('');
  const [lowerOptions, setLowerOptions] = useState<string[]>([]);   // 클래스 프로퍼티
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // 상위 태그 옵션을 로드하는 함수 (예시 데이터 사용)
    const fetchUpperOptions = async () => {
      const options: string[] = ['option1', 'option2', 'option3'];
      setUpperOptions(options);
    };

    fetchUpperOptions();
  }, []);

  useEffect(() => {
    if (selectedUpper) {
      const fetchLowerOptions = async () => {
        setLoading(true);
        try {
          const response = await axios.post<{ buckets: Bucket[] }>('http://localhost:3000/api/get-lower-options', {
            selectedUpper
          });
          setLowerOptions(response.data.buckets.map((bucket) => bucket.key));
        } catch (error) {
          console.error('Error fetching lower options:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchLowerOptions();
    }
  }, [selectedUpper]);

  return (
    <div>
      <select value={selectedUpper} onChange={(e) => setSelectedUpper(e.target.value)}>
        <option value="">Select Upper Option</option>
        {upperOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      <select>
        <option value="">Select Lower Option</option>
        {loading ? (
          <option>Loading...</option>
        ) : (
          lowerOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))
        )}
      </select>
    </div>
  );
};

export default SelectComponent;