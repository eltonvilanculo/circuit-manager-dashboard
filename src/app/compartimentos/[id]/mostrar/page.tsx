"use client";
import { useState, useEffect } from "react";
import AppSwitch from "@/components/AppSwitch";
import {
  firebaseRef,
  updateTriggerValue,
} from "@/controller/firebase.controller";
import { onValue } from "firebase/database";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const [roomEquipments, setRoomEquipments] = useState<any[]>([]);
  const [equipmentStatus, setEquipmentStatus] = useState<boolean>(false);
  const [equpmentData, setEquipmentData] = useState<any>({});

  const handleToggle = async (value: boolean) => {
    try {
      await updateTriggerValue(value === true ? 1 : 0);
      setEquipmentStatus(value);
    } catch (error) {
      console.log("🚀 ~ handleToggle ~ error:", error);
    }
  };

  useEffect(() => {
    let dataFire = null;
    const fetchRoomEquipment = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/equipment/${params.id}`
        );
        const dto = await response.json();

        setRoomEquipments(dto.data.roomEquipments || []);
      } catch (error) {
        console.log("🚀 ~ fetchRoomEquipment ~ error:", error);
      }
    };
    fetchRoomEquipment();

    const unsubscribe = onValue(
      firebaseRef,
      (snapshot) => {
        dataFire = snapshot.val();

        if (dataFire) {
          setEquipmentStatus(dataFire.Trigger === 0 ? false : true);
          setEquipmentData(dataFire);
        } else {
          setEquipmentStatus(false);
        }
      },
      (error) => {
        console.error("Error reading Firebase data:", error);
      }
    );

    return () => unsubscribe();
  }, [equipmentStatus]); // Add `params.id` to the dependency array

  return (
    <div className="grid grid-cols-2 items-center gap-32">
      {roomEquipments.map((room) => (
        <AppSwitch
          key={room.equipment.id}
          name={room.equipment.name}
          id={room.equipment.id}
          active={equipmentStatus}
          consumption={equpmentData?.kwh || 0}
          i={equpmentData?.i}
          p={equpmentData?.p}
          v={equpmentData?.v}
          handleToggle={handleToggle}

          // Show consumption from Firebase data
        />
      ))}
    </div>
  );
}
