from django import forms
from arboverse_updated.management.models import DataUploader
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Div, Submit, HTML, Button, Row, Field
from crispy_forms.bootstrap import AppendedText, PrependedText, FormActions

class DataUploadForm(forms.ModelForm):

    class Meta:
        model = DataUploader
        fields = ["datafile","notes"]

#    template   = "management/data_upload.html"

    helper = FormHelper
    helper.form_class = 'form-horizontal'
    helper.layout = Layout(
        Field('datafile'),
        Field('note', rows='3', css_class='input-large'),
        FormActions(
            Submit('save_changes',
                   'Save changes',
                   css_class='btn-primary'
                   ),
            Submit('cancel', 'Cancel'),
        )
    )
