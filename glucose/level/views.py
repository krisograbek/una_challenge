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

SORTING_COLUMNS = ["timestamp", "measure_type", "glucose_level"]


class LevelListCreate(generics.ListCreateAPIView):
    serializer_class = LevelSerializer
    queryset = Level.objects.all()

    def get(self, response):
        queryset = Level.objects.all()
        # query parameters
        user = self.request.query_params.get("user")
        start = self.request.query_params.get("start")
        stop = self.request.query_params.get("stop")

        queryset = queryset.filter(user=user)

        available_users = Level.objects.order_by().values_list("user").distinct()
        available_users = [u[0] for u in available_users]

        returned_data = JsonResponse(
            {"data": list(queryset.values()), "availableUsers": list(available_users)}
        )
        return returned_data

    def post(self, request):
        # init queryset
        queryset = Level.objects.all()
        # read body
        body_unicode = request.body.decode("utf-8")
        body = json.loads(body_unicode)

        # default rows per page
        rows_per_page = 50

        # get user for filtering
        user = body["username"]
        # user must be provided
        if user is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # get page number
        # +1 because JS begins with 0
        page_number = body["pageNumber"] + 1

        # update rows per page
        if body["rowsPerPage"] is not None:
            rows_per_page = body["rowsPerPage"]

        # filter by user
        queryset = queryset.filter(user=user)

        # prepare ordering
        if body["orderBy"] in SORTING_COLUMNS:
            order_by = body["orderBy"]
            # change direction if descending
            if body["isAscending"] == False:
                order_by = "-" + order_by
            queryset = queryset.order_by(order_by)

        # init paginator
        paginator = Paginator(queryset, rows_per_page)
        # get data
        data = paginator.get_page(page_number).object_list
        # prepare json for paginator data
        paginator_json = {
            "count": paginator.count,
            "num_pages": paginator.num_pages,
        }
        # print(data)
        returned_data = JsonResponse(
            {"data": list(data.values()), "paginator": paginator_json},
            status=status.HTTP_200_OK,
        )
        return returned_data


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
