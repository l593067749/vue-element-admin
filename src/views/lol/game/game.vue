<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="temp"  ref="postForm">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="21">
            <el-form-item style="margin-bottom: 40px;" >
              <MDinput name="name"  required :maxlength="100" >
                {{postForm.title}}
              </MDinput>
            </el-form-item>
            
            <el-form-item label-width="200px" label="静态例子（el-select）：" class="postInfo-container-item">
                    <el-select class="filter-item" clearable filterable v-model="temp.author" placeholder="请选择">
                      <el-option v-for="item in  userLIstOptions" :disabled="item.key==='Rails'" :key="item.key" :label="item.language" :value="item.key">
                        {{item.key}}---{{item.language}}
                      </el-option>
                    </el-select>
            </el-form-item>

            <el-form-item label-width="200px" label="远程例子（el-select）：" class="postInfo-container-item">
                    <el-select size="large" class="filter-item" multiple remote :remote-method="remoteMethod" filterable v-model="temp.multiselectVal" placeholder="请选择">
                      <el-option v-for="item in  queryListOptions" :key="item.key" :label="item.language" :value="item.key">
                      </el-option>
                    </el-select>
            </el-form-item>

          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button  type="primary" @click="create">确 定</el-button>
        
      </div>

      <el-table  :data="list2"  element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
          <el-table-column width="110px" align="center" label="标题">
              <template scope="scope">
                <span>{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column width="110px" align="center" label="队伍1">
              <template scope="scope">
                <span>{{scope.row.team1}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column prop="team1"
              label="队伍1"
              width="180">
            </el-table-column>
      </el-table>

      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchList } from '@/api/lol/game/game'
export default {
  name: 'articleDetail',
  components: { Tinymce, MDinput, Upload, Multiselect, Sticky },
  props: {
    'postForm': {
      default: function() {
        return { title: 'hello', team1: 'team1' }
      }
    }
  },
  data() {
    return {
      list: [{ title: 'hello', team1: 'team1' }, { title: 'hello-2', team1: 'team1-2' }],
      list2: [this.postForm],
      author: 'Sinatra',
      options: ['Select option', 'Sinatra'],
      userLIstOptions: [
        { key: 'Rails', language: 'Ruby' },
        { key: 'Vue.js', language: 'JavaScript' },
        { key: 'Sinatra', language: 'Sinatra2' }
      ],
      temp: {
        id: undefined,
        author: '',
        multiselectVal: [],
        timestamp: 0,
        title: '',
        status: 'published',
        type: ''
      },
      multiselectVal: '',
      queryListOptions: []
    }
  },
  methods: {
    nameWithLang({ key, language }) {
      return `${key} — [${language}]`
    },
    remoteMethod(query) {
      if (query !== '') {
        this.queryListOptions = this.userLIstOptions.filter(item => {
          return item.language.toLowerCase().indexOf(query.toLowerCase()) > -1
        })
      }
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        author: '',
        multiselectVal: [],
        timestamp: 0,
        title: '',
        status: 'published',
        type: ''
      }
    },
    create() {
      console.log(this.temp)
      this.siample01()
    },
    siample01() {
      fetchList(null)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .title-prompt{
    position: absolute;
    right: 0px;
    font-size: 12px;
    top:10px;
    color:#ff4949;
  }
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
            text-align: right;
            margin-right: 10px;
            .editor-upload-btn {
                display: inline-block;
            }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
</style>

