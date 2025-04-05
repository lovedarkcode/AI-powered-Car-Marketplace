"use client";

import {useState,useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Heart,Car,CarIcon,Loader} from 'lucide-react';
import {Button} from './ui/button';
import {Card,cardContent} from "./ui/card";
import { toast } from 'sonner';
// import toggleSavedCar from '@actions/car-listing';
import { useAuth } from '@clerk/nextjs';
import {useRouter} from 'next/router';
import useFetch from '@/hooks/use-fetch';

function CarCard({car}) {
    const isSignedIn = useAuth();
    const router = useRouter();
    const [isSaved,setIsSaved] = useState(car.wishlisted);

    //use the useFetch hook
    const{
        loading:isToggling,
        fn:toggleSavedCarFn,
        data:toggleResult,
        error:toggleError,
    } = useFetch(toggleSavedCar);
    //handle toggle result with useEffect
    useEffect(()=>{
        if(toggleResult?.success && toggleResult.saved!==isSaved){
            setIsSaved(toggleResult.saved);
            toast.success(toggleResult.message);
        }
    },[toggleResult,isSaved])
    //handle error with useEffct
    useEffect(()=>{
        if(toggleError){
            toast.error("Falied to update favorites");
        }
    },[toggleError])
    //handle save/unsave car
    const handleToggleSave = async(e)=>{
        e.preventDefault()
        e.stopPropogation();

        if(!isSignedIn){
            toast.error("You need to sign in to save cars");
            router.push("/sign-in");
            return
        }
        if(isToggling) return;

        await toggleSavedCarFn(car.id);
    }
  return (
    <Card className="overflow-hidden hover:shadow-lg transition group">
    <div className="relative h-48">
      {car.images && car.images.length > 0 ? (
        <div className="relative w-full h-full">
          <Image
            src={car.images[0]}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <CarIcon className="h-12 w-12 text-gray-400" />
        </div>
      )}

      <Button
        variant="ghost"
        size="icon"
        className={`absolute top-2 right-2 bg-white/90 rounded-full p-1.5 ${
          isSaved
            ? "text-red-500 hover:text-red-600"
            : "text-gray-600 hover:text-gray-900"
        }`}
        onClick={handleToggleSave}
        disabled={isToggling}
      >
        {isToggling ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Heart className={isSaved ? "fill-current" : ""} size={20} />
        )}
      </Button>
    </div>

    <CardContent className="p-4">
      <div className="flex flex-col mb-2">
        <h3 className="text-lg font-bold line-clamp-1">
          {car.make} {car.model}
        </h3>
        <span className="text-xl font-bold text-blue-600">
          ${car.price.toLocaleString()}
        </span>
      </div>

      <div className="text-gray-600 mb-2 flex items-center">
        <span>{car.year}</span>
        <span className="mx-2">•</span>
        <span>{car.transmission}</span>
        <span className="mx-2">•</span>
        <span>{car.fuelType}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        <Badge variant="outline" className="bg-gray-50">
          {car.bodyType}
        </Badge>
        <Badge variant="outline" className="bg-gray-50">
          {car.mileage.toLocaleString()} miles
        </Badge>
        <Badge variant="outline" className="bg-gray-50">
          {car.color}
        </Badge>
      </div>

      <div className="flex justify-between">
        <Button
          className="flex-1"
          onClick={() => {
            router.push(`/cars/${car.id}`);
          }}
        >
          View Car
        </Button>
      </div>
    </CardContent>
  </Card>
  )
}

export default CarCard