from django.db import models


class Level(models.Model):
    user = models.CharField(max_length=100)
    device = models.CharField(max_length=100)
    device_number = models.CharField(max_length=100)
    timestamp = models.DateTimeField()
    measure_type = models.IntegerField()
    glucose_level = models.IntegerField()
