from urllib import request
from .models import Level
from .serializers import LevelSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from django.core.paginator import Paginator
from django.http import JsonResponse
import csv
import os
import datetime as dt
import json


class LevelListCreate(generics.ListCreateAPIView):
    serializer_class = LevelSerializer
    queryset = Level.objects.all()

    def get(self, response):
        queryset = Level.objects.all()
        # query parameters
        user = self.request.query_params.get("user")
        start = self.request.query_params.get("start")
        stop = self.request.query_params.get("stop")
        results_per_page = 25

        if user is not None:
            queryset = queryset.filter(user=user)
        if self.request.query_params.get("per_page"):
            results_per_page = self.request.query_params.get("per_page")

        paginator = Paginator(queryset, results_per_page)
        print(paginator.count, paginator.num_pages, paginator.page_range)
        returned_data = JsonResponse(
            {"data": list(queryset.values()), "others": "others"}
        )
        return returned_data

    def post(self, request):
        body_unicode = request.body.decode("utf-8")
        body = json.loads(body_unicode)
        print("POST REQUEST", body)

        return Response(status=status.HTTP_200_OK)


class ResetDatabase(generics.ListAPIView):
    serializer_class = LevelSerializer
    queryset = Level.objects.all()

    def post(self, request):
        filenames = os.listdir("./data/")
        filenames = [filename for filename in filenames if filename.endswith(".csv")]
        for fname in filenames:
            # get user from the filename
            user = fname[:-4]
            with open(os.path.join("./data", fname)) as f:
                reader = list(csv.reader(f))
                # skip first 3 rows
                for row in reader[3:]:
                    # read info
                    device = row[0]
                    device_number = row[1]
                    timestamp = dt.datetime.strptime(row[2], "%d-%m-%Y %H:%M")
                    measure_type = int(row[3])
                    # select row depending on a measure type
                    print(device, timestamp, measure_type, type(measure_type))
                    if measure_type in [0, 1]:
                        if measure_type == 0:
                            glucose_level = int(row[4])
                        else:
                            glucose_level = int(row[5])
                        level = Level(
                            user=user,
                            device=device,
                            device_number=device_number,
                            timestamp=timestamp,
                            measure_type=measure_type,
                            glucose_level=glucose_level,
                        )
                        level.save()
        return Response(status=status.HTTP_201_CREATED)
